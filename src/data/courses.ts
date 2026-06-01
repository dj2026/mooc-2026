export interface SubTopic {
  id?: string;
  subtitle: Record<string, string>;
  text: Record<string, string>;
  exampleCode: string;
}

export interface LessonContent {
  id: string;
  title: Record<string, string>;
  subTopics: SubTopic[];
  description?: Record<string, string>;
  theoryInstructions?: Record<string, string>;
}

export interface Course {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  icon: string;
  image: string;
  logoSize: number;
  disabled?: boolean;
  content: LessonContent[];
}

export const courses: Course[] = [
  {
    id: "Python",
    title: { ca: "Python", es: "Python", en: "Python" },
    description: {
      ca: "Domina el llenguatge més versàtil: des de scripting fins a automatització de dades.",
      es: "Domina el lenguaje más versátil: desde scripting hasta automatización de datos.",
      en: "Master the most versatile language: from scripting to data automation.",
    },
    icon: "CODE",
    image: "/img/Python.svg",
    logoSize: 80,
    content: [
      {
        id: "py-1",
        title: { ca: "1. Introducció a l'Ecosistema", es: "1. Introducción al Ecosistema", en: "1. Introduction to the Ecosystem" },
        subTopics: [
          {
            id: "py-1-1",
            subtitle: { ca: "1.1- Què és Python?", es: "1.1- ¿Qué es Python?", en: "1.1- What is Python?" },
            text: {
              ca: "Python és un llenguatge de programació d'alt nivell, interpretat i multiparadigma que s'ha convertit en l'estàndard de la indústria tecnològica moderna. La seva filosofia es basa en el 'Zen de Python', que postula que 'el que és simple és millor que el que és complex'.\n\nL'ecosistema Python es divideix en quatre pilars fonamentals:\n\n1- Ciència de Dades i IA: És el motor principal de la intel·ligència artificial. Gràcies a la seva potència de càlcul i simplicitat, s'utilitza per analitzar tendències de mercat, processar llenguatge natural i entrenar xarxes neuronals complexes.\n\n2- Desenvolupament Backend: Python gestiona la lògica de servidor de les aplicacions més grans del món. Frameworks com Django o Flask permeten crear arquitectures segures, escalables i ràpides de mantenir.\n\n3- Automatització i Scripting: És l'eina definitiva per eliminar tasques repetitives. Des de moure milers de fitxers fins a extreure dades de webs (web scraping), Python estalvia milers d'hores de feina manual.\n\n4- Qualitat i Testing (QA): En el cicle de vida del software, Python és el preferit per crear bateries de proves automatitzades que garanteixen que cada actualització sigui estable i lliure d'errors.\n\nEscollir Python com a primer llenguatge no només és una decisió pràctica per la seva llegibilitat, sinó una inversió de futur gràcies a la seva gegantina comunitat i la seva capacitat de funcionar en qualsevol sistema operatiu.\n\nPer començar, el clàssic 'Hola Món' en Python és l'exemple perfecte de la seva simplicitat: només cal la instrucció `print('Hola Python')`. Mentre que altres llenguatges obliguen a escriure diverses línies de codi estructural, Python et permet veure resultats immediats amb una sintaxi neta i directa.",
              es: "Python es un lenguaje de programación de alto nivel, interpretado y multiparadigma que se ha convertido en el estándar de la industria tecnológica moderna. Su filosofía se basa en el 'Zen de Python', que postula que 'lo simple es mejor que lo complejo'.\n\nEl ecosistema Python se divide en cuatro pilares fundamentales:\n\n1- Ciencia de Datos e IA: Es el motor principal de la inteligencia artificial. Gracias a su potencia de cálculo, se utiliza para analizar tendencias de mercado, procesar lenguaje natural y entrenar redes neuronales complejas.\n\n2- Desarrollo Backend: Python gestiona la lógica de servidor de las aplicaciones más grandes del mundo. Frameworks como Django o Flask permiten crear arquitecturas seguras, escalables y rápidas de mantener.\n\n3- Automatización y Scripting: Es la herramienta definitiva para eliminar tareas repetitivas. Desde mover miles de archivos hasta extraer datos de webs (web scraping), Python ahorra miles de horas de trabajo manual.\n\n4- Calidad y Testing (QA): En el ciclo de vida del software, Python es el preferido para crear baterías de pruebas automatizadas que garantizan que cada actualización sea estable y libre de errores.\n\nElegir Python como primer lenguaje no es solo una decisión práctica por su legibilidad, sino una inversión de futuro gracias a su gigantesca comunidad y su capacidad de funcionar en cualquier sistema operativo.\n\nPara empezar, el clásico 'Hola Mundo' en Python es el ejemplo perfecto de su simplicidad: solo requiere la instrucción `print('Hola Python')`. Mientras que otros lenguajes obligan a escribir varias líneas de código estructural, Python te permite ver resultados inmediatos con una sintaxis limpia y directa.",
              en: "Python is a high-level, interpreted, multi-paradigm programming language that has become the standard for the modern tech industry. Its philosophy is rooted in the 'Zen of Python,' which states that 'simple is better than complex.'\n\nThe Python ecosystem is built on four core pillars:\n\n1- Data Science & AI: It is the main engine behind artificial intelligence. Due to its computational power, it is used to analyze market trends, process natural language, and train complex neural networks.\n\n2- Backend Development: Python handles the server-side logic for the world's largest applications. Frameworks like Django or Flask allow for secure, scalable, and easy-to-maintain architectures.\n\n3- Automation & Scripting: The ultimate tool for eliminating repetitive tasks. From moving thousands of files to extracting web data (web scraping), Python saves thousands of manual labor hours.\n\n4- Quality Assurance & Testing (QA): In the software development lifecycle, Python is the top choice for creating automated test suites that ensure every update is stable and bug-free.\n\nChoosing Python as a first language is not only a practical decision due to its readability but also a future-proof investment thanks to its massive community and cross-platform compatibility.\n\nTo start, the classic 'Hello World' in Python is the perfect example of its simplicity: it only requires the command `print('Hola Python')`. While other languages force you to write several lines of structural code, Python allows you to see immediate results with clean and straightforward syntax.",
            },
            exampleCode: "print('')",
          },
        ],
      },
      {
        id: "py-2",
        title: { ca: "2. Variables i Tipus", es: "2. Variables y Tipos", en: "2. Variables and Types" },
        subTopics: [
          {
            id: "py-2-1",
            subtitle: { ca: "2.1- Tipat Dinàmic", es: "2.1- Tipado Dinámico", en: "2.1- Dynamic Typing" },
            text: { ca: "En Python les variables no necessiten declaració de tipus; es defineixen en assignar un valor.", es: "En Python las variables no necesitan declaración de tipo...", en: "In Python, variables don't need type declaration..." },
            exampleCode: "x = 5\nnom = 'Pau'",
          },
        ],
      },
      {
        id: "py-3",
        title: { ca: "3. Operadors Bàsics", es: "3. Operadores Básicos", en: "3. Basic Operators" },
        subTopics: [
          {
            id: "py-3-1",
            subtitle: { ca: "3.1- Aritmètica Avançada", es: "3.1- Aritmética Avanzada", en: "3.1- Advanced Arithmetic" },
            text: { ca: "Python inclou el mòdul (%) per al residu i l'exponent (**).", es: "Python incluye el módulo (%) y el exponente (**).", en: "Python includes modulo (%) and exponent (**)." },
            exampleCode: "residu = 10 % 3",
          },
        ],
      },
      {
        id: "py-4",
        title: { ca: "4. Strings i f-strings", es: "4. Strings y f-strings", en: "Strings and f-strings" },
        subTopics: [
          {
            id: "py-4-1",
            subtitle: { ca: "4.1- Interpolació", es: "4.1- Interpolación", en: "4.1- Interpolation" },
            text: { ca: "Les f-strings permeten incrustar expressions dins de cadenes de text.", es: "Las f-strings permiten incrustar expresiones...", en: "f-strings allow embedding expressions..." },
            exampleCode: "f'Valor: {x}'",
          },
        ],
      },
      {
        id: "py-5",
        title: { ca: "5. Llistes", es: "5. Listas", en: "5. Lists" },
        subTopics: [
          {
            id: "py-5-1",
            subtitle: { ca: "5.1- Estructures lineals", es: "5.1- Estructuras lineales", en: "5.1- Linear structures" },
            text: { ca: "Les llistes són mutables i permeten guardar qualsevol tipus de dada.", es: "Las listas son mutables y permiten guardar cualquier dato.", en: "Lists are mutable and allow storing any data." },
            exampleCode: "L = [1, 'a', True]",
          },
        ],
      },
      {
        id: "py-6",
        title: { ca: "6. Condicionals", es: "6. Condicionales", en: "6. Conditionals" },
        subTopics: [
          {
            id: "py-6-1",
            subtitle: { ca: "6.1- If, Elif, Else", es: "6.1- If, Elif, Else", en: "6.1- If, Elif, Else" },
            text: { ca: "Controlen el flux basant-se en valors booleans.", es: "Controlan el flujo basándose en booleanos.", en: "They control flow based on booleans." },
            exampleCode: "if x > 0: print('OK')",
          },
        ],
      },
      {
        id: "py-7",
        title: { ca: "7. Bucles (Loops)", es: "7. Bucles", en: "7. Loops" },
        subTopics: [
          {
            id: "py-7-1",
            subtitle: { ca: "7.1- For i While", es: "7.1- For y While", en: "7.1- For and While" },
            text: { ca: "For s'usa per iterar sobre seqüències; While mentre una condició sigui certa.", es: "For itera sobre secuencias; While mientras sea cierto.", en: "For iterates over sequences; While runs while true." },
            exampleCode: "for i in range(5): print(i)",
          },
        ],
      },
      {
        id: "py-8",
        title: { ca: "8. Diccionaris i Tuples", es: "8. Diccionarios y Tuplas", en: "8. Dictionaries and Tuples" },
        subTopics: [
          {
            id: "py-8-1",
            subtitle: { ca: "8.1- Clau:Valor", es: "8.1- Clave:Valor", en: "8.1- Key:Value" },
            text: { ca: "Els diccionaris són col·leccions no ordenades indexades per claus.", es: "Los diccionarios son colecciones indexadas por llaves.", en: "Dictionaries are collections indexed by keys." },
            exampleCode: "D = {'id': 1}",
          },
        ],
      },
      {
        id: "py-9",
        title: { ca: "9. Funcions", es: "9. Funciones", en: "9. Functions" },
        subTopics: [
          {
            id: "py-9-1",
            subtitle: { ca: "9.1- Def i Return", es: "9.1- Def y Return", en: "9.1- Def and Return" },
            text: { ca: "Permeten encapsular codi per reutilitzar-lo.", es: "Permiten encapsular código reutilizable.", en: "Allow encapsulating reusable code." },
            exampleCode: "def f(): return True",
          },
        ],
      },
      {
        id: "py-10",
        title: { ca: "10. Gestió d'Errors", es: "10. Gestión de Errores", en: "10. Error Handling" },
        subTopics: [
          {
            id: "py-10-1",
            subtitle: { ca: "10.1- Try / Except", es: "10.1- Try / Except", en: "10.1- Try / Except" },
            text: { ca: "Evita que el programa s'aturi davant d'errors inesperats.", es: "Evita que el programa se detenga por errores.", en: "Prevents program from stopping due to errors." },
            exampleCode: "try: x = 1/0\nexcept: print('Error')",
          },
        ],
      },
      {
        id: "py-11",
        title: { ca: "11. Classes i POO", es: "11. Clases y POO", en: "11. Classes and OOP" },
        subTopics: [
          {
            id: "py-11-1",
            subtitle: { ca: "11.1- Objectes", es: "11.1- Objetos", en: "11.1- Objects" },
            text: { ca: "Python és totalment orientat a objectes. Tot és una instància d'una classe.", es: "Python es orientado a objetos. Todo es una instancia.", en: "Python is OOP-based. Everything is an instance." },
            exampleCode: "class Cotxe: pass",
          },
        ],
      },
      {
        id: "py-12",
        title: { ca: "12. Mòduls i PIP", es: "12. Módulos y PIP", en: "12. Modules and PIP" },
        subTopics: [
          {
            id: "py-12-1",
            subtitle: { ca: "12.1- Import", es: "12.1- Import", en: "12.1- Import" },
            text: { ca: "Usa 'import' per carregar llibreries com math o random.", es: "Usa 'import' para cargar librerías.", en: "Use 'import' to load libraries." },
            exampleCode: "import math",
          },
        ],
      },
      {
        id: "py-13",
        title: { ca: "13. Fitxers I/O", es: "13. Archivos I/O", en: "13. Files I/O" },
        subTopics: [
          {
            id: "py-13-1",
            subtitle: { ca: "13.1- Open i Close", es: "13.1- Open y Close", en: "13.1- Open and Close" },
            text: { ca: "Permet llegir i escriure dades en el disc dur.", es: "Permite leer y escribir datos en disco.", en: "Allows reading and writing data to disk." },
            exampleCode: "f = open('test.txt', 'r')",
          },
        ],
      },
    ],
  },
  {
    id: "React",
    title: { ca: "React", es: "React", en: "React" },
    description: { ca: "Construeix interfícies modernes.", es: "Construye interfaces modernas.", en: "Build modern interfaces." },
    icon: "CONNECT_O",
    image: "/img/React.svg",
    logoSize: 90,
    content: [
      {
        id: "re-1",
        title: { ca: "1. Components i Props", es: "1. Componentes y Props", en: "1. Components and Props" },
        description: { ca: "JSX i Retorns", es: "JSX y Retornos", en: "JSX and Returns" },
        theoryInstructions: { ca: "Un component és una funció JavaScript que retorna JSX.", es: "Un componente es una función JavaScript que retorna JSX.", en: "A component is a JavaScript function that returns JSX." },
        subTopics: [
          {
            subtitle: { ca: "Fonaments JSX", es: "Fundamentos JSX", en: "JSX Basics" },
            text: { ca: "JSX és una extensió de sintaxi per a React que permet escriure HTML dins de JavaScript.", es: "JSX es una extensión de sintaxis para React que permite escribir HTML dentro de JavaScript.", en: "JSX is a syntax extension for React that lets you write HTML inside JavaScript." },
            exampleCode: "const element = <h1>Hola, Món!</h1>;",
          },
          {
            subtitle: { ca: "Components", es: "Componentes", en: "Components" },
            text: { ca: "Un component és una funció JavaScript que retorna JSX. El nom del component ha de començar amb majúscula.", es: "Un componente es una función JavaScript que retorna JSX. El nombre del componente debe empezar con mayúscula.", en: "A component is a JavaScript function that returns JSX. The component name must start with a capital letter." },
            exampleCode: "function Saluda() {\n  return <h1>Hola</h1>;\n}",
          },
        ],
      },
      {
        id: "re-2",
        title: { ca: "2. Props de Text", es: "2. Props de Texto", en: "2. Text Props" },
        description: { ca: "Passant dades", es: "Pasando datos", en: "Passing data" },
        theoryInstructions: { ca: "Les props s'accedeixen com a paràmetre objecte a la funció.", es: "Las props se acceden como parámetro objeto en la función.", en: "Props are accessed as an object parameter in the function." },
        subTopics: [
          {
            subtitle: { ca: "Props", es: "Props", en: "Props" },
            text: { ca: "Les props són arguments que es passen a un component. S'accedeixen com a paràmetre objecte de la funció.", es: "Las props son argumentos que se pasan a un componente. Se acceden como parámetro objeto de la función.", en: "Props are arguments passed to a component. They are accessed as an object parameter of the function." },
            exampleCode: "function Saluda({ nom }) {\n  return <p>Hola, {nom}!</p>;\n}",
          },
        ],
      },
    ],
  },
  {
    id: "springboot",
    title: { ca: "Spring Boot", es: "Spring Boot", en: "Spring Boot" },
    disabled: true,
    description: { ca: "APIs REST amb Java.", es: "APIs REST con Java.", en: "REST APIs with Java." },
    icon: "DATABASE",
    image: "/img/SB.svg",
    logoSize: 100,
    content: [
      {
        id: "sp-1",
        title: { ca: "1. REST API", es: "1. REST API", en: "1. REST API" },
        description: { ca: "Controladors", es: "Controladores", en: "Controllers" },
        theoryInstructions: { ca: "Spring Boot utilitza anotacions per configurar components.", es: "Spring Boot utiliza anotaciones para configurar componentes.", en: "Spring Boot uses annotations to configure components." },
        subTopics: [
          {
            subtitle: { ca: "Anotacions Spring Boot", es: "Anotaciones Spring Boot", en: "Spring Boot Annotations" },
            text: { ca: "Spring Boot utilitza anotacions com @SpringBootApplication per configurar automàticament l'aplicació.", es: "Spring Boot utiliza anotaciones como @SpringBootApplication para configurar automáticamente la aplicación.", en: "Spring Boot uses annotations like @SpringBootApplication to auto-configure the application." },
            exampleCode: "@SpringBootApplication\npublic class App {\n  public static void main(String[] args) {\n    SpringApplication.run(App.class, args);\n  }\n}",
          },
          {
            subtitle: { ca: "Injecció de Dependències", es: "Inyección de Dependencias", en: "Dependency Injection" },
            text: { ca: "La injecció de dependències permet gestionar objectes automàticament amb @Autowired.", es: "La inyección de dependencias permite gestionar objetos automáticamente con @Autowired.", en: "Dependency injection allows managing objects automatically with @Autowired." },
            exampleCode: "@Service\npublic class UsuariService {\n  @Autowired\n  private UsuariRepository repo;\n}",
          },
        ],
      },
      {
        id: "sp-2",
        title: { ca: "2. Controladors REST", es: "2. Controladores REST", en: "2. REST Controllers" },
        description: { ca: "Construint APIs", es: "Construyendo APIs", en: "Building APIs" },
        theoryInstructions: { ca: "@RestController combina @Controller i @ResponseBody.", es: "@RestController combina @Controller y @ResponseBody.", en: "@RestController combines @Controller and @ResponseBody." },
        subTopics: [
          {
            subtitle: { ca: "Controladors REST", es: "Controladores REST", en: "REST Controllers" },
            text: { ca: "@RestController combina @Controller i @ResponseBody per crear APIs REST.", es: "@RestController combina @Controller y @ResponseBody para crear APIs REST.", en: "@RestController combines @Controller and @ResponseBody to create REST APIs." },
            exampleCode: "@RestController\npublic class ApiController {\n  @GetMapping(\"/api/health\")\n  public String health() { return \"OK\"; }\n}",
          },
          {
            subtitle: { ca: "Mapejar Peticions", es: "Mapear Peticiones", en: "Mapping Requests" },
            text: { ca: "Les anotacions @GetMapping, @PostMapping, etc. associen mètodes a rutes HTTP.", es: "Las anotaciones @GetMapping, @PostMapping, etc. asocian métodos a rutas HTTP.", en: "@GetMapping, @PostMapping, etc. annotations map methods to HTTP routes." },
            exampleCode: "@RestController\npublic class ProductController {\n  @GetMapping(\"/productes\")\n  public List<Producte> getAll() { return service.findAll(); }\n}",
          },
        ],
      },
    ],
  },
  {
    id: "MachineLearning",
    title: { ca: "Machine Learning", es: "Machine Learning", en: "Machine Learning" },
    disabled: true,
    description: { ca: "Models predictius i IA.", es: "Modelos predictivos e IA.", en: "Predictive models and AI." },
    icon: "CLUSTER",
    image: "/img/ml.svg",
    logoSize: 110,
    content: [
      {
        id: "ml-1",
        title: { ca: "1. Definició de ML", es: "1. Definición de ML", en: "1. ML Definition" },
        description: { ca: "Conceptes", es: "Conceptos", en: "Concepts" },
        theoryInstructions: { ca: "El ML permet que els sistemes aprenguin de les dades per millorar el seu rendiment.", es: "El ML permite que los sistemas aprendan de los datos para mejorar su rendimiento.", en: "ML allows systems to learn from data to improve performance." },
        subTopics: [
          {
            subtitle: { ca: "Què és ML?", es: "¿Qué es ML?", en: "What is ML?" },
            text: { ca: "El Machine Learning permet que els sistemes aprenguin de les dades sense ser programats explícitament.", es: "El Machine Learning permite que los sistemas aprendan de los datos sin ser programados explícitamente.", en: "Machine Learning allows systems to learn from data without being explicitly programmed." },
            exampleCode: "# Machine Learning\n# Aprenentatge a partir de dades",
          },
          {
            subtitle: { ca: "Tipus d'Aprenentatge", es: "Tipos de Aprendizaje", en: "Types of Learning" },
            text: { ca: "Hi ha tres tipus principals: supervisat, no supervisat i per reforç.", es: "Hay tres tipos principales: supervisado, no supervisado y por refuerzo.", en: "There are three main types: supervised, unsupervised, and reinforcement learning." },
            exampleCode: "# Aprenentatge Supervisat\n# Les dades tenen etiquetes",
          },
        ],
      },
      {
        id: "ml-2",
        title: { ca: "2. Dades d'Entrenament", es: "2. Datos de Entrenamiento", en: "2. Training Data" },
        description: { ca: "Datasets", es: "Datasets", en: "Datasets" },
        theoryInstructions: { ca: "Les dades d'entrenament ensenyen el model; les de prova avaluen la precisió.", es: "Los datos de entrenamiento enseñan al modelo; los de prueba evalúan la precisión.", en: "Training data teaches the model; test data evaluates accuracy." },
        subTopics: [
          {
            subtitle: { ca: "Dades d'Entrenament", es: "Datos de Entrenamiento", en: "Training Data" },
            text: { ca: "Les dades d'entrenament són el conjunt que el model utilitza per aprendre patrons i relacions.", es: "Los datos de entrenamiento son el conjunto que el modelo utiliza para aprender patrones y relaciones.", en: "Training data is the set the model uses to learn patterns and relationships." },
            exampleCode: "import numpy as np\nX_train = np.array([1, 2, 3, 4, 5])\ny_train = np.array([2, 4, 6, 8, 10])",
          },
          {
            subtitle: { ca: "Avaluació de Models", es: "Evaluación de Modelos", en: "Model Evaluation" },
            text: { ca: "Es divideixen les dades en entrenament i prova per avaluar la precisió del model.", es: "Se dividen los datos en entrenamiento y prueba para evaluar la precisión del modelo.", en: "Data is split into training and test sets to evaluate model accuracy." },
            exampleCode: "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)",
          },
        ],
      },
    ],
  },
];
