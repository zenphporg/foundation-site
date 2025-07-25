<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class EmailVerificationPromptController extends Controller
{
  /**
   * Show the email verification prompt page.
   */
  public function __invoke(Request $request): RedirectResponse|Response
  {
    $user = $request->user();

    // @codeCoverageIgnoreStart
    if ($user === null) {
      return redirect()->route('login');
    }
    // @codeCoverageIgnoreEnd

    return $user->hasVerifiedEmail()
                ? redirect()->intended(route('dashboard', absolute: false))
                : Inertia::render('auth/VerifyEmail', ['status' => $request->session()->get('status')]);
  }
}
