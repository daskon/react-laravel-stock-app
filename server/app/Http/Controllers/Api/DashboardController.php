<?php

namespace App\Http\Controllers\Api;

use App\Events\StockLeftNotification;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * show dahsboard live updates
     *
     * @return void
     */
    public function show()
    {
        $data = Product::all();
        event(new StockLeftNotification((count($data))));
    }
}
