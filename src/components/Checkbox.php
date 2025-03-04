<?php

namespace Banzee\SaasComponents\Components;

use Illuminate\View\Component;

class Checkbox extends Component
{
    public $type;

    public function __construct($type = 'info')
    {
        $this->type = $type;
    }

    
    public function render()
    {
        return view('saas-components::components.checkbox');
    }
}