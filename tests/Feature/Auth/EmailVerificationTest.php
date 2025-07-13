<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;

test('email verification screen can be rendered', function (): void {
  $user = User::factory()->unverified()->create();

  $response = $this->actingAs($user)->get('/verify-email');

  $response->assertStatus(200);
});

test('email can be verified', function (): void {
  $user = User::factory()->unverified()->create();

  Event::fake();

  $verificationUrl = URL::temporarySignedRoute(
    'verification.verify',
    now()->addMinutes(60),
    ['id' => $user->id, 'hash' => sha1((string) $user->email)]
  );

  $response = $this->actingAs($user)->get($verificationUrl);

  Event::assertDispatched(Verified::class);
  expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
  $response->assertRedirect(route('dashboard', absolute: false).'?verified=1');
});

test('email is not verified with invalid hash', function (): void {
  $user = User::factory()->unverified()->create();

  $verificationUrl = URL::temporarySignedRoute(
    'verification.verify',
    now()->addMinutes(60),
    ['id' => $user->id, 'hash' => sha1('wrong-email')]
  );

  $this->actingAs($user)->get($verificationUrl);

  expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

test('email verification notification can be sent', function (): void {
  $user = User::factory()->unverified()->create();

  $response = $this->actingAs($user)->post('/email/verification-notification');

  $response->assertRedirect();
  $response->assertSessionHas('status', 'verification-link-sent');
});

test('email verification notification redirects if already verified', function (): void {
  $user = User::factory()->create(); // Already verified

  $response = $this->actingAs($user)->post('/email/verification-notification');

  $response->assertRedirect(route('dashboard', absolute: false));
});

test('email verification prompt redirects verified users to dashboard', function (): void {
  $user = User::factory()->create(); // Already verified

  $response = $this->actingAs($user)->get('/verify-email');

  $response->assertRedirect(route('dashboard', absolute: false));
});

test('already verified user gets redirected when trying to verify again', function (): void {
  $user = User::factory()->create(); // Already verified

  $verificationUrl = URL::temporarySignedRoute(
    'verification.verify',
    now()->addMinutes(60),
    ['id' => $user->id, 'hash' => sha1($user->getEmailForVerification())]
  );

  $response = $this->actingAs($user)->get($verificationUrl);

  $response->assertRedirect(route('dashboard', absolute: false).'?verified=1');
});
