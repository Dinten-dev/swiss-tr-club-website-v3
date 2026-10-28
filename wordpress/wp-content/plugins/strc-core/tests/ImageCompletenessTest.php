<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Community\PrivateUploadStore;

final class ImageCompletenessTest extends TestCase
{
    private function file(string $bytes): string
    {
        $path = (string) tempnam(sys_get_temp_dir(), 'strc');
        file_put_contents($path, $bytes);
        return $path;
    }

    public function testCompleteJpegPasses(): void
    {
        $path = $this->file("\xFF\xD8\xFF\xE0" . str_repeat("\x12", 64) . "\xFF\xD9");
        self::assertTrue(PrivateUploadStore::completeImage($path, 'image/jpeg', (int) filesize($path)));
    }

    public function testTruncatedJpegFails(): void
    {
        $path = $this->file("\xFF\xD8\xFF\xE0" . str_repeat("\x12", 64));
        self::assertFalse(PrivateUploadStore::completeImage($path, 'image/jpeg', (int) filesize($path)));
    }

    public function testPngNeedsEndChunk(): void
    {
        $body = "\x89PNG\r\n\x1A\n" . str_repeat("\x00", 32);
        $complete = $this->file($body . "\x00\x00\x00\x00IEND\xAE\x42\x60\x82");
        $cut = $this->file($body);
        self::assertTrue(PrivateUploadStore::completeImage($complete, 'image/png', (int) filesize($complete)));
        self::assertFalse(PrivateUploadStore::completeImage($cut, 'image/png', (int) filesize($cut)));
    }

    public function testWebpLengthMustMatch(): void
    {
        $payload = 'WEBPVP8 ' . str_repeat("\x01", 20);
        $complete = $this->file('RIFF' . pack('V', strlen($payload)) . $payload);
        $cut = $this->file('RIFF' . pack('V', strlen($payload) + 500) . $payload);
        self::assertTrue(PrivateUploadStore::completeImage($complete, 'image/webp', (int) filesize($complete)));
        self::assertFalse(PrivateUploadStore::completeImage($cut, 'image/webp', (int) filesize($cut)));
    }
}
