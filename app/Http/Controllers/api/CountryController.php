<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use Illuminate\Support\Facades\Validator;

class CountryController extends Controller
{
    //* Mostar todos los paises
    public function index()
    {
        $countries = Country::where('active', 0)->get();
        return response()->json(
            [
                'status' => 'success',
                'data' => $countries,

            ],
        );
    }

    //* Mostrar un pais
    public function show($id)
    {
        $country = Country::where('id', $id)->where('active', 0)->first();
        if ($country) {
            return response()->json(
                [
                    'status' => 'success',
                    'data' => $country,
                ],
            );
        } else {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Country not found',
                ],
            );
        }
    }

    //* Crear un pais
    public function new(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100|min:3',
            'region' => 'required|string|max:100',
            'population' => 'required|integer|min:1',
            'president_elect' => 'required|string|max:100',
            'size' => 'required|numeric|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validator->errors(),
                ],
            );
        }
        $country = new Country();
        $country->name = $request->name;
        $country->region = $request->region;
        $country->population = $request->population;
        $country->president_elect = $request->president_elect;
        $country->size = $request->size;
        $country->save();
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Country created successfully',
            ],
        );
    }

    //* Actualizar un pais
    public function edit(Request $request, $id)
    {
        $country = Country::where('id', $id)->where('active', 0)->first();
        if (!$country) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Country not found',
                ],
            );
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100|min:3',
            'region' => 'required|string|max:100',
            'population' => 'required|integer|min:1',
            'president_elect' => 'required|string|max:100',
            'size' => 'required|numeric|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => $validator->errors(),
                ],
            );
        }
        $country->name = $request->name;
        $country->region = $request->region;
        $country->population = $request->population;
        $country->president_elect = $request->president_elect;
        $country->size = $request->size;
        $country->save();
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Country updated successfully',
            ],
        );
    }

    //* Eliminar un pais
    public function destroy($id)
    {
        $country = Country::where('id', $id)->where('active', 0)->first();
        if (!$country) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Country not found',
                ],
            );
        }
        $country->active = 1;
        $country->save();
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Country deleted successfully',
            ],
        );
    }
}
