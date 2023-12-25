export default function ListaSubCategorias() {
    return (
        <div className="flex justify-between items-start">
        <div className="w-full p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Listas de sub-familias disponibles</h2>
          <select
            className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="Cars"
            size="10"
          >
            <option
             
              value="Merceders"
            >
              Merceders
            </option>
            <option
            
              value="BMW"
            >
              BMW
            </option>
            <option
              
              value="Jaguar"
            >
              Jaguar
            </option>
            <option
             
              value="Lamborghini"
            >
              Lamborghini
            </option>
            <option
              
              value="Ferrari"
            >
              Ferrari
            </option>
            <option
              
              value="Ford"
            >
              Ford
            </option>
          </select>
          
        </div>
      </div>
    );
}

