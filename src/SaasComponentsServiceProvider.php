<?php

namespace Banzee\SaasComponents;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class SaasComponentsServiceProvider extends ServiceProvider
{
	public function boot(): void
	{
		$this->loadRoutesFrom(__DIR__ . '/routes/web.php');
		$this->loadTranslationsFrom(__DIR__ . '/lang', 'saas-components');
		$this->loadViewsFrom(__DIR__ . '/resources/views', 'saas-components');
		Blade::componentNamespace('Banzee\\SaasComponents\\Components', 'saas');
		$this->publishes([
			__DIR__ . '/resources/assets' => public_path('vendor/saas-components'),
		], 'public');
	}

	public function register(): void {}
}
