<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\TypeDeclaration\Rector\StmtsAwareInterface\DeclareStrictTypesRector;

return RectorConfig::configure()
  ->withPaths([
    __DIR__.'/app',
    __DIR__.'/bootstrap/app.php',
    __DIR__.'/database',
    __DIR__.'/public',
    __DIR__.'/tests',
    __DIR__.'/routes',
  ])
  ->withPreparedSets(
    deadCode: true,
    codeQuality: true,
    typeDeclarations: true,
    privatization: true,
    naming: true,
    earlyReturn: true,
    instanceOf: true,
    strictBooleans: true
  )
  ->withPhpSets(php84: true)
  ->withRules([
    DeclareStrictTypesRector::class,
  ])
  ->withSkip([
    '*/vendor/*',
    '*/bootstrap/cache/*',
  ]);
