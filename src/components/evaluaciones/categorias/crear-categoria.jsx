export default function CatalogosEvaluaciones() {
    return (
        <div className="p-8 rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">CATALOGO DE FAMILIAS DE EVALUACIÓN</h1>
              <div className="flex justify-between items-center mb-6">
                <input
                  aria-label="Search"
                  className="border border-gray-300 p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search"
                  type="text"
                />
                <button className="bg-blue-600 text-white p-2 rounded-md ml-6 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Guardar
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div className="w-full p-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Listas de familias</h2>
                  <select
                    className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="Cars"
                    size="10"
                  >
                    <option
                      style={{
                        backgroundColor: "#f0f8ff",
                      }}
                      value="Merceders"
                    >
                      Merceders
                    </option>
                    <option
                      style={{
                        backgroundColor: "#faebd7",
                      }}
                      value="BMW"
                    >
                      BMW
                    </option>
                    <option
                      style={{
                        backgroundColor: "#f0ffff",
                      }}
                      value="Jaguar"
                    >
                      Jaguar
                    </option>
                    <option
                      style={{
                        backgroundColor: "#f5f5dc",
                      }}
                      value="Lamborghini"
                    >
                      Lamborghini
                    </option>
                    <option
                      style={{
                        backgroundColor: "#fff5ee",
                      }}
                      value="Ferrari"
                    >
                      Ferrari
                    </option>
                    <option
                      style={{
                        backgroundColor: "#f5f5f5",
                      }}
                      value="Ford"
                    >
                      Ford
                    </option>
                  </select>
                  <div className="flex justify-between items-center mt-4">
                    <button className="bg-blue-600 text-white p-2 rounded-md mr-2 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Prev Page
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Next Page
                    </button>
                  </div>
                  <label className="block mt-6 text-sm text-gray-700" htmlFor="familyName">
                    Nombre de familia de evaluaciones
                  </label>
                  <input
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="familyName"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button className="bg-blue-600 text-white p-2 rounded-md mr-2 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Guardar
                </button>
                <button className="bg-red-600 text-white p-2 rounded-md mr-2 shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                  Eliminar
                </button>
                <button className="bg-green-600 text-white p-2 rounded-md mr-2 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  Reporte
                </button>
                <button className="bg-yellow-600 text-white p-2 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                  Generar PDF
                </button>
              </div>
            </div>
          </div>
    );
}

