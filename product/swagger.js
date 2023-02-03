
import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/categoriesRoutes.js', './src/routes/productsRoutes.js']

const swaggerAutogen2 = swaggerAutogen();


const doc = {
    info: {
        version: "1.0.0",
        title: "API Ecomm",
        description: "Projeto chamado **Ecomm**, que é um ecommerce baseado no Mercado Livre ou semelhantes que será um projeto construído em partes, ou seja, teremos alguns projetos que se conectam e em conjunto, fazem o Ecomm funcionar.  Some useful links:    - [The Ecomm repository](https://github.com/cairogr/ecomm)"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Categories",
            "description": "Endpoints"
        },
        {
            "name": "Products",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    },
    definitions: {
        Categories: {
            $id: 1,
            $name: "Phone",
            $status: true
        },
        Products: {
            $name: "Notebook Samsung",
            $description: "Samsung Book Core i5-1135G7, 8G, 256GB SSD, Iris Xe, 15.6 FHD, W11 Cinza",
            $slug: "notebook-samsung",
            $unitPrice: 3523.00,
            $quantityStock: 1,
            $idCategory: "INFORMÁTICA"
        },
  
}
}

swaggerAutogen2(outputFile, endpointsFiles, doc)


// .then(() => {
//     import ('./src/config/server.js')
// })