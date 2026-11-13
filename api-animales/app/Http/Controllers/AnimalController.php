<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index()
    {
        return response()->json(Animal::orderBy('id')->get());
    }

    public function store(Request $request)
    {
        $datos = $this->validar($request);
        $animal = Animal::create($datos);

        return response()->json($animal, 201);
    }

    public function show(string $id)
    {
        $animal = Animal::findOrFail($id);

        return response()->json($animal);
    }

    public function update(Request $request, string $id)
    {
        $animal = Animal::findOrFail($id);
        $datos = $this->validar($request);
        $animal->update($datos);

        return response()->json($animal);
    }

    public function destroy(string $id)
    {
        $animal = Animal::findOrFail($id);
        $animal->delete();

        return response()->json([
            'mensaje' => 'Animal eliminado correctamente',
        ]);
    }

    private function validar(Request $request): array
    {
        return $request->validate([
            'nombre' => 'required|string|max:100',
            'especie' => 'required|string|max:100',
            'raza' => 'required|string|max:100',
            'edad' => 'required|integer|min:0|max:200',
        ]);
    }
}