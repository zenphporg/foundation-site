<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

final class VerifyEmailController extends Controller
{
  /**
   * Mark the authenticated user's email address as verified.
   */
  public function __invoke(EmailVerificationRequest $emailVerificationRequest): RedirectResponse
  {
    /** @var \App\Models\User|null $user */
    $user = $emailVerificationRequest->user();

    // @codeCoverageIgnoreStart
    if ($user === null) {
      return redirect()->route('login');
    }
    // @codeCoverageIgnoreEnd

    if ($user->hasVerifiedEmail()) {
      return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }

    if ($user->markEmailAsVerified()) {
      /** @var \Illuminate\Contracts\Auth\MustVerifyEmail $verifiableUser */
      $verifiableUser = $user;
      event(new Verified($verifiableUser));
    }

    return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
  }
}
