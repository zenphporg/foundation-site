<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id): bool {
  /** @var \App\Models\User $user */
  /** @var string $id */
  return $user->id === (int) $id;
});
