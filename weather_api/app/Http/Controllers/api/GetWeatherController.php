<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GetWeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $lang = $request->input('lang');
        $units = $request->input('units');
        $url = "https://api.openweathermap.org/data/2.5/forecast?lat=".$lat."&lon=".$lon."&units=".$units."&lang=".$lang."&appid=8c4d673ca47a9bd9ff436dcdee56e3bf";
        
        $response = Http::post($url);

        if ($response->successful()) {
            $data = $response->json();
            return response()->json([$data], 200);
        } else {
            $statusCode = $response->status();
            $errorMessage = $response->json();
            return response()->json([
                'message' => 'Ошибка запроса к API',
                'status' => $statusCode,
                'error' => $errorMessage,
            ], $statusCode);
        }
    }
}
