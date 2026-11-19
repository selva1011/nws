// Builds display copies of the catalogue photos with consistent framing.
//
// The supplied photos carry very different baked-in white margins (the chair
// fills 45–98% of the frame height), so fitting the originals into identical
// tiles produces mismatched chair sizes and baselines. This script crops each
// photo to its non-white content box plus a small uniform margin, at native
// resolution (no resampling, no colour or orientation change), and writes it
// under the same file name to the output folder. Originals are never modified.
//
// macOS only (ImageIO/CoreGraphics). Not part of the build. Re-run after
// adding or replacing a photo:
//   swift scripts/frame-product-photos.swift "public/products images" public/product-display
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

let arguments = CommandLine.arguments
guard arguments.count == 3 else {
  print("usage: swift scripts/frame-product-photos.swift <source-dir> <output-dir>")
  exit(1)
}
let source = URL(fileURLWithPath: arguments[1], isDirectory: true)
let output = URL(fileURLWithPath: arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)

let backgroundLevel: UInt8 = 244 // a pixel is background when every channel is >= this
let marginRatio = 0.015 // margin added on every side, relative to the longer content side
let quality = 0.85

let files = try FileManager.default.contentsOfDirectory(atPath: source.path)
  .filter { ["jpg", "jpeg", "png"].contains(($0 as NSString).pathExtension.lowercased()) }
  .sorted()

for name in files {
  let input = source.appendingPathComponent(name)
  guard let imageSource = CGImageSourceCreateWithURL(input as CFURL, nil),
        let image = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
    print("skip (unreadable): \(name)")
    continue
  }
  let width = image.width, height = image.height

  // Rasterise once in sRGB to find content pixels.
  var pixels = [UInt8](repeating: 0, count: width * height * 4)
  let context = CGContext(
    data: &pixels, width: width, height: height, bitsPerComponent: 8, bytesPerRow: width * 4,
    space: CGColorSpace(name: CGColorSpace.sRGB)!,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))

  var rowCounts = [Int](repeating: 0, count: height)
  var columnCounts = [Int](repeating: 0, count: width)
  for y in 0..<height {
    for x in 0..<width {
      let i = (y * width + x) * 4
      if pixels[i] < backgroundLevel || pixels[i + 1] < backgroundLevel || pixels[i + 2] < backgroundLevel {
        rowCounts[y] += 1
        columnCounts[x] += 1
      }
    }
  }
  // Ignore isolated specks: a row/column counts once it has a few content pixels.
  let minimumRow = max(2, width / 500), minimumColumn = max(2, height / 500)
  guard let top = rowCounts.firstIndex(where: { $0 >= minimumRow }),
        let bottom = rowCounts.lastIndex(where: { $0 >= minimumRow }),
        let left = columnCounts.firstIndex(where: { $0 >= minimumColumn }),
        let right = columnCounts.lastIndex(where: { $0 >= minimumColumn }) else {
    print("skip (no content found): \(name)")
    continue
  }
  let contentWidth = right - left + 1, contentHeight = bottom - top + 1
  let margin = Int((Double(max(contentWidth, contentHeight)) * marginRatio).rounded())
  let crop = CGRect(
    x: max(0, left - margin), y: max(0, top - margin),
    width: min(width, right + margin + 1) - max(0, left - margin),
    height: min(height, bottom + margin + 1) - max(0, top - margin))
  guard let framed = image.cropping(to: crop) else {
    print("skip (crop failed): \(name)")
    continue
  }

  let destinationURL = output.appendingPathComponent(name)
  guard let destination = CGImageDestinationCreateWithURL(
    destinationURL as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else {
    print("skip (cannot write): \(name)")
    continue
  }
  CGImageDestinationAddImage(
    destination, framed, [kCGImageDestinationLossyCompressionQuality: quality] as CFDictionary)
  CGImageDestinationFinalize(destination)
  print(String(format: "%@  %dx%d -> %dx%d  (content %.0f%% of original height)",
               name, width, height, framed.width, framed.height,
               Double(contentHeight) / Double(height) * 100))
}
