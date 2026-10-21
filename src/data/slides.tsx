import type { SlideDef } from "@/lib/types";
import CoverBody from "@/components/slide/templates/CoverBody";
import CodeSlide from "@/components/slide/templates/CodeSlide";
import LinkGrid from "@/components/slide/LinkGrid";
import MediaFrame from "@/components/slide/MediaFrame";

const lifecycle = `// ofApp.h - Declaración de variables
#pragma once
#include "ofMain.h"

class ofApp : public ofBaseApp {
public:
    void setup();
    void update();
    void draw();

    float xPos; // Posición horizontal
    float speed; // Velocidad px/frame
};

// ofApp.cpp - Implementación lógica
void ofApp::setup() {
    ofSetFrameRate(60);
    ofSetBackgroundColor(15, 23, 42);
    xPos = 0; speed = 3.5;
}

void ofApp::update() { xPos += speed; }

void ofApp::draw() {
    ofSetColor(37, 99, 235);
    ofDrawCircle(xPos, ofGetHeight()/2, 25);
}`;

const loopsGrid = `// Grid 2D de Círculos en draw()
void ofApp::draw() {
    int cols = 16, rows = 10;
    float spacingX = ofGetWidth() / cols;
    float spacingY = ofGetHeight() / rows;

    for (int i = 0; i < cols; i++) {
        for (int j = 0; j < rows; j++) {
            float x = i * spacingX + spacingX / 2;
            float y = j * spacingY + spacingY / 2;

            float r = ofMap(i + j, 0, cols + rows, 2, 14);
            ofSetColor(255 - i * 12, 100 + j * 12, 220);
            ofDrawCircle(x, y, r);
        }
    }
}`;

const fboBuffer = `// Configuración y uso de ofFbo
ofFbo fbo;

void ofApp::setup() {
    fbo.allocate(ofGetWidth(), ofGetHeight(), GL_RGBA);
    fbo.begin();
    ofClear(0, 0, 0, 0);
    fbo.end();
}

void ofApp::update() {
    fbo.begin(); // Trazo persistente acumulativo
    ofSetColor(ofRandom(255), 100, 250, 40);
    ofDrawCircle(ofRandomWidth(), ofRandomHeight(), 10);
    fbo.end();
}

void ofApp::draw() {
    ofSetColor(255);
    fbo.draw(0, 0);
}`;

const interaction = `// Cinemática con rebote y control por teclado
float x = 100, y = 100, vx = 4.5, vy = 3.0, r = 18;

void ofApp::update() {
    x += vx; y += vy;

    // Colisión con bordes
    if (x - r < 0 || x + r > ofGetWidth())  vx *= -1;
    if (y - r < 0 || y + r > ofGetHeight()) vy *= -1;
}

void ofApp::keyPressed(int key) {
    if (key == 'r' || key == 'R') {
        x = ofGetMouseX(); y = ofGetMouseY();
    }
}`;

const polyline = `// Creación y muestreo de una polilínea
ofPolyline line;

void ofApp::setup() {
    for (int i = 0; i < 400; i += 10) {
        float angle = ofMap(i, 0, 400, 0, TWO_PI * 2);
        float y = ofGetHeight() / 2 + sin(angle) * 70;
        line.addVertex(i + 150, y);
    }
}

void ofApp::draw() {
    ofSetColor(37, 99, 235);
    line.draw();

    glm::vec3 p = line.getPointAtPercent(fmod(ofGetElapsedTimef() * 0.2, 1.0));
    ofSetColor(244, 63, 94);
    ofDrawCircle(p.x, p.y, 8);
}`;

const spiral = `// Espiral de Arquímedes en draw()
void ofApp::draw() {
    float cx = ofGetWidth() / 2, cy = ofGetHeight() / 2;
    float r = 0, angle = 0;

    ofSetColor(96, 165, 250);
    ofNoFill();
    ofBeginShape();
    for (int i = 0; i < 180; i++) {
        float x = cx + r * cos(angle);
        float y = cy + r * sin(angle);
        ofVertex(x, y);
        angle += 0.15;
        r += 1.1;
    }
    ofEndShape();
}`;

const transforms = `// Rotación local de un elemento
void ofApp::draw() {
    float x = 400, y = 280;
    float rot = ofGetElapsedTimef() * 45;

    ofPushMatrix();
    ofTranslate(x, y);
    ofRotateDeg(rot);

    ofSetColor(244, 63, 94);
    ofSetRectMode(OF_RECTMODE_CENTER);
    ofDrawRectangle(0, 0, 100, 70);
    ofPopMatrix();
}`;

const noiseColor = `// Movimiento y color armónico con Noise
void ofApp::draw() {
    float t = ofGetElapsedTimef();

    float x = ofNoise(t * 0.4) * ofGetWidth();
    float y = ofNoise(t * 0.4 + 50.0) * ofGetHeight();
    float hue = ofNoise(t * 0.1) * 255;

    ofColor col;
    col.setHsb(hue, 200, 255);
    ofSetColor(col);
    ofDrawCircle(x, y, 30);
}`;

const objects = `// Ball.h - Declaración
class Ball {
public:
    glm::vec2 pos, vel;
    Ball(float x, float y);
    void update();
    void draw();
};

// ofApp.cpp - Manejo del vector
std::vector<Ball> balls;

void ofApp::setup() {
    for (int i = 0; i < 200; i++)
        balls.push_back(Ball(ofRandomWidth(), ofRandomHeight()));
}

void ofApp::update() { for (auto &b : balls) b.update(); }
void ofApp::draw()   { for (auto &b : balls) b.draw(); }`;

const typography = `// Extraer vértices de caracteres
ofTrueTypeFont font;

void ofApp::setup() {
    font.load("SpaceGrotesk-Bold.ttf", 90, true, true, true);
}

void ofApp::draw() {
    vector<ofPath> paths = font.getStringAsPoints("CODE");
    ofSetColor(37, 99, 235);

    for (size_t i = 0; i < paths.size(); i++) {
        vector<ofPolyline> lines = paths[i].getOutline();
        for (size_t j = 0; j < lines.size(); j++) {
            for (size_t k = 0; k < lines[j].size(); k += 4) {
                glm::vec3 pt = lines[j][k];
                ofDrawCircle(pt.x + 180, pt.y + 380, 2.5);
            }
        }
    }
}`;

const imageHalftone = `// Trama de puntos basada en brillo
ofImage img;

void ofApp::setup() { img.load("portrait.png"); }

void ofApp::draw() {
    int step = 10;
    for (int y = 0; y < img.getHeight(); y += step) {
        for (int x = 0; x < img.getWidth(); x += step) {
            ofColor c = img.getColor(x, y);
            float b = c.getBrightness();
            float r = ofMap(b, 0, 255, 0, step / 2.0);

            ofSetColor(c);
            ofDrawCircle(x + 100, y + 80, r);
        }
    }
}`;

const threeD = `// Render 3D con cámara orbital
ofEasyCam cam;

void ofApp::setup() { ofEnableDepthTest(); }

void ofApp::draw() {
    cam.begin();
    for (int x = -150; x <= 150; x += 75) {
        for (int z = -150; z <= 150; z += 75) {
            ofPushMatrix();
            ofTranslate(x, 0, z);
            float h = ofNoise(x * 0.01, z * 0.01, ofGetElapsedTimef()) * 70;
            ofSetColor(96, 165, 250);
            ofDrawBox(0, 0, 0, 30, h, 30);
            ofPopMatrix();
        }
    }
    cam.end();
}`;

const activity1Run1 = `// 1st Git Assignment - Ejecución 1 - ofApp::draw()
void ofApp::draw() {
    ofBackground(145);
    ofSetColor(255);

    int radius = 30;
    int diameter = radius * 2;

    for (int row = 0; row < 10; row++) {
        for (int column = 0; column < 10; column++) {

            // shifts the position of the circles so they dont pile up,
            // and keeps the first circle from being cut off at the edge.
            float x = column * diameter + radius;
            float y = row * diameter + radius;
            ofDrawCircle(x, y, radius);
        }
    }
}`;

const activity1Run2 = `// 1st Git Assignment - Ejecución 2 - ofApp::draw()
void ofApp::draw() {
    ofBackground(145);
    ofSetColor(255);

    int bigCircleRadius = 30, smallCircleRadius = 12;
    int bigDiameter = bigCircleRadius * 2;

    // BIG CIRCLES
    for (int row = 0; row < 10; row++) {
        for (int column = 0; column < 10; column++) {
            float x = column * bigDiameter + bigCircleRadius;
            float y = row * bigDiameter + bigCircleRadius;
            ofDrawCircle(x, y, bigCircleRadius);
        }
    }

    // SMALL CIRCLES (sin el offset: quedan en las esquinas)
    for (int row = 0; row < 11; row++) {
        for (int column = 0; column < 11; column++) {
            float x = column * bigDiameter;
            float y = row * bigDiameter;
            ofDrawCircle(x, y, smallCircleRadius);
        }
    }

    ofSetColor(000);

    // BLACK CIRCLES
    for (int row = 10; row > -1; row--) {
        for (int column = 10; column > -1; column--) {
            float x = column * bigDiameter + bigCircleRadius;
            float y = row * bigDiameter + bigCircleRadius;

            // ofMap(value, inMin, inMax, outMin, outMax): row * column (0-81)
            // se remapea a un radio entre 0 y bigCircleRadius (0-30).
            float blackRadius = ofMap(row * column, 0, 9 * 9, 0, bigCircleRadius);
            ofDrawCircle(x, y, blackRadius);
        }
    }
}`;

export const slides: SlideDef[] = [
  {
    id: "slide1",
    variant: "cover",
    eyebrow: "CITM - UPC BarcelonaTech",
    body: (
      <CoverBody
        title="Manual de Programación Creativa y Referencia C++ en OpenFrameworks"
        subtitle="Guía técnica explicada al detalle: patrones de código, lógica algorítmica, arquitectura de software y ejercicios resueltos paso a paso."
      />
    ),
  },
  {
    id: "slide2",
    eyebrow: "Tema 1: Arquitectura y Ciclo de Vida",
    title: "Estructura Interna de ofApp y Configuración Global",
    body: (
      <CodeSlide
        note={{
          title: "Lógica del Bucle Principal (60 FPS)",
          text: "OpenFrameworks separa el cálculo de datos de la renderización gráfica para garantizar la fluidez a 60 fotogramas por segundo.",
        }}
        items={[
          { icon: "fa-play", content: <><b>setup():</b> Inicializa asignaciones de memoria, carga assets, fija el Canvas (`ofSetBackgroundColor`) y framerate (`ofSetFrameRate`).</> },
          { icon: "fa-arrows-rotate", content: <><b>update():</b> Calcula el estado lógico de los datos antes de pintar (físicas, lecturas de sensores). Sin código de dibujo.</> },
          { icon: "fa-paintbrush", content: <><b>draw():</b> Renderiza en pantalla. Todo comando gráfico se procesa aquí en la GPU.</> },
        ]}
        code={lifecycle}
        source="Fuente: Creative Programming OF 01.pdf"
      />
    ),
  },
  {
    id: "slide3",
    eyebrow: "Tema 2: Bucles y Patrones Geométricos",
    title: "Control de Iteraciones: For, While y Rejillas 2D",
    body: (
      <CodeSlide
        note={{
          title: "Algoritmos de Repetición Espacial",
          text: "Los bucles generan cientos de elementos visuales en un único fotograma mediante iteraciones sobre matrices 2D.",
        }}
        items={[
          { icon: "fa-border-all", content: <><b>Bucles Anidados:</b> Un bucle de filas ($y$) dentro de columnas ($x$) calcula coordenadas para cubrir el Canvas completo.</> },
          { icon: "fa-sliders", content: <><b>Modulación de Parámetros:</b> Utilizar los contadores $i, j$ dentro de `ofMap` permite escalar radios, colores y grosores.</> },
        ]}
        code={loopsGrid}
        source="Fuente: Creative Programming OF 02 - Loops and buffers.pdf"
      />
    ),
  },
  {
    id: "slide4",
    eyebrow: "Tema 2: Bucles y Buffers",
    title: "Lienzos Secundarios: Uso de ofFbo para Retención Gráfica",
    body: (
      <CodeSlide
        note={{
          title: "Ventajas del Buffer en Memoria",
          text: "`ofFbo` actúa como una textura en memoria GPU donde se acumulan trazos sin borrar el fondo cuadro a cuadro.",
        }}
        items={[
          { icon: "fa-floppy-disk", content: <><b>Fijación de Aleatoriedad:</b> Permite congelar llamadas a `ofRandom()` sin que parpadeen a 60 FPS.</> },
          { icon: "fa-wand-magic-sparkles", content: <><b>Ámbito de Dibujo:</b> Requiere abrir con `.begin()` y cerrar con `.end()` antes de proyectar con `.draw()`.</> },
        ]}
        code={fboBuffer}
        source="Fuente: Creative Programming OF 02 - Loops and buffers.pdf"
      />
    ),
  },
  {
    id: "slide5",
    eyebrow: "Tema 3: Dinámicas Interactivas y Eventos",
    title: "Manejo de Entrada de Usuario y Cinemática de Rebotes",
    body: (
      <CodeSlide
        note={{
          title: "Interacción en Tiempo Real",
          text: "Captura el estado del ratón mediante `ofGetMouseX()` y detecta teclas accionadas con el evento `keyPressed(int key)`.",
        }}
        items={[
          { icon: "fa-gamepad", content: <><b>Físicas de Pantalla:</b> Mantiene objetos dentro del área útil invirtiendo la velocidad ($Vx = -Vx$) en los límites.</> },
          { icon: "fa-wind", content: <><b>Atractor Suave (Easing):</b> Interpola coordenadas hacia el cursor: `x += (mouseX - x) * 0.1`.</> },
        ]}
        code={interaction}
        source="Fuente: Creative Programming OF 03 - Animation, Interaction, Shapes.pdf"
      />
    ),
  },
  {
    id: "slide6",
    eyebrow: "Tema 3: Formas Complejas",
    title: "Vectorización y Trazado de Formas con ofPolyline",
    body: (
      <CodeSlide
        note={{
          title: "Gestión Avanzada de Vértices",
          text: "`ofPolyline` crea estructuras vectoriales continuas y evalúa posiciones interpoladas sobre su recorrido.",
        }}
        items={[
          { icon: "fa-bezier-curve", content: <><b>Curvas Bézier:</b> Genera curvas suaves utilizando dos puntos ancla y dos puntos de control.</> },
          { icon: "fa-route", content: <><b>Muestreo Porcentual:</b> `.getPointAtPercent(float)` obtiene coordenadas exactas a lo largo de la curva.</> },
        ]}
        code={polyline}
        source="Fuente: Creative Programming OF 03 - Animation, Interaction, Shapes.pdf"
      />
    ),
  },
  {
    id: "slide7",
    eyebrow: "Tema 4: Matemáticas e Interpolar Espacial",
    title: "Seno, Coseno y Conversión de Coordenadas Polares",
    body: (
      <CodeSlide
        note={{
          title: "Conversión Polar a Cartesiana",
          text: "Transforma ángulo ($\\theta$) y radio ($r$) en coordenadas cartesianas ($x,y$) para dibujar círculos y espirales.",
        }}
        items={[
          { icon: "fa-calculator", content: <><b>Ecuación Paramétrica:</b><br />$x = cx + r \cdot \cos(\theta)$, $y = cy + r \cdot \sin(\theta)$</> },
          { icon: "fa-sync", content: <><b>Espirales:</b> Incrementar el radio $r$ progresivamente en cada paso angular genera una espiral.</> },
        ]}
        code={spiral}
        source="Fuente: Creative Programming OF 04 - Trigonometry, plane operations.pdf"
      />
    ),
  },
  {
    id: "slide8",
    eyebrow: "Tema 4: Geometría y Transformaciones",
    title: "Aislamiento de Transformaciones: Push y Pop Matrix",
    body: (
      <CodeSlide
        note={{
          title: "Aislamiento de Coordenadas",
          text: "Permite trasladar, rotar o escalar elementos respecto a su propio centro sin alterar los demás objetos.",
        }}
        items={[
          { icon: "fa-arrows-to-dot", content: <><b>ofTranslate(x,y):</b> Reubica el origen del sistema de coordenadas $(0,0)$.</> },
          { icon: "fa-rotate-right", content: <><b>ofRotateDeg(deg):</b> Rota la matriz completa sobre el punto de origen actual.</> },
          { icon: "fa-box-archive", content: <><b>PushMatrix / PopMatrix:</b> Empuja y restaura la matriz para delimitar el cambio local.</> },
        ]}
        code={transforms}
        source="Fuente: Creative Programming OF 04 - Trigonometry, plane operations.pdf"
      />
    ),
  },
  {
    id: "slide9",
    eyebrow: "Tema 5: Color y Comportamiento Orgánico",
    title: "Color HSB y Fluctuaciones Continuas con ofNoise",
    body: (
      <CodeSlide
        note={{
          title: "Fluctuaciones Naturales con Perlin Noise",
          text: "`ofNoise()` genera secuencias armónicas continuas entre $0.0$ y $1.0$, ideales para simular movimientos orgánicos.",
        }}
        items={[
          { icon: "fa-palette", content: <><b>Espacio HSB:</b> Permite recorrer la paleta completa alterando un solo valor (`Hue` de 0 a 255).</> },
          { icon: "fa-wave-square", content: <><b>Escala Temporal:</b> Se aconseja avanzar la semilla del ruido con incrementos pequeños (`time * 0.1`).</> },
        ]}
        code={noiseColor}
        source="Fuente: Creative Programming OF 05 - Hue and Noise.pdf"
      />
    ),
  },
  {
    id: "slide10",
    eyebrow: "Tema 6: Arquitectura Orientada a Objetos",
    title: "Diseño de Clases Customizadas y Gestor std::vector",
    body: (
      <CodeSlide
        note={{
          title: "Encapsulación y Objetos Múltiples",
          text: "Estructurar agentes en clases autónomas gestionadas dentro de un `std::vector` facilita la escalabilidad del sistema.",
        }}
        items={[
          { icon: "fa-code-branch", content: <><b>Encapsulación:</b> Cada objeto instancia sus variables únicas (posición, velocidad) y expone sus métodos.</> },
          { icon: "fa-list-check", content: <><b>Recorrido Dinámico:</b> Iteración limpia mediante `for(auto &item : vector)`.</> },
        ]}
        code={objects}
        source="Fuente: Creative Programming OF 06 - Objects.pdf"
      />
    ),
  },
  {
    id: "slide11",
    eyebrow: "Tema 7: Manipulación Tipográfica",
    title: "Extracción de Contornos de Fuentes con ofTrueTypeFont",
    body: (
      <CodeSlide
        note={{
          title: "Texto como Geometría Vectorial",
          text: "Descompone glifos en contornos vectoriales y puntos editables mediante algoritmos de diseño generativo.",
        }}
        items={[
          { icon: "fa-font", content: <><b>Carga de Fuentes:</b> Los archivos `.ttf` deben situarse dentro del directorio `bin/data/`.</> },
          { icon: "fa-draw-polygon", content: <><b>getStringAsPoints():</b>{" Genera un `vector<ofPath>` accesible punto a punto."}</> },
        ]}
        code={typography}
        source="Fuente: Creative Programming OF 07 - Text and Image.pdf"
      />
    ),
  },
  {
    id: "slide12",
    eyebrow: "Tema 7: Procesamiento de Imágenes",
    title: "Manipulación Directa de Píxeles con ofImage",
    body: (
      <CodeSlide
        note={{
          title: "Muestreo de Matrices de Píxeles",
          text: "Lee valores de color y brillo de una imagen cargada para generar tramados vectoriales interactivos.",
        }}
        items={[
          { icon: "fa-image", content: <><b>Consulta de Color:</b> Método `img.getColor(x, y)` para consultar las componentes cromáticas del píxel.</> },
          { icon: "fa-circle-dot", content: <><b>Tramado (Halftone):</b> Salta pasos de muestreo (`step = 10`) para dibujar formas reducidas proporcionales al brillo.</> },
        ]}
        code={imageHalftone}
        source="Fuente: Creative Programming OF 07 - Text and Image.pdf"
      />
    ),
  },
  {
    id: "slide13",
    eyebrow: "Tema 8: Gráficos Tridimensionales",
    title: "Cámara Virtual ofEasyCam y Primitivas 3D",
    body: (
      <CodeSlide
        note={{
          title: "Navegación en Entornos 3D",
          text: "Instancia cámaras virtuales que permiten rotar y hacer zoom en el espacio tridimensional.",
        }}
        items={[
          { icon: "fa-cube", content: <><b>Primitivas 3D:</b> Incorpora elementos tridimensionales como `ofDrawBox()` u `ofDrawSphere()`.</> },
          { icon: "fa-eye", content: <><b>Buffer Z:</b> La instrucción `ofEnableDepthTest()` resuelve la oclusión correcta de objetos en profundidad.</> },
        ]}
        code={threeD}
        source="Fuente: Creative Programming OF 08 - 3D.pdf"
      />
    ),
  },
  {
    id: "slide14",
    variant: "dark",
    eyebrow: "Repositorio de Ejercicios",
    title: "Acceso Directo a Asignaciones en GitHub Classroom",
    body: (
      <>
        <LinkGrid
          links={[
            { label: "1st Git Assignment (Loops)", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/1st-git-assignment-fixed/accept" },
            { label: "Animating Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/animating/accept" },
            { label: "300 Balls Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/300-balls/accept" },
            { label: "Yin Yang Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/yin-yang/accept" },
            { label: "Polylines Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/polylines/accept" },
            { label: "Spiral Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/spiral/accept" },
            { label: "Black Sun Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/black-sun/accept" },
            { label: "Noiseballs Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/noiseballs/accept" },
            { label: "Spinning Stars Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/spinning-stars/accept" },
            { label: "Super Letters Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/super-letters/accept" },
            { label: "Dot Letters Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/dot-letters/accept" },
            { label: "Image to Dots Assignment", href: "https://classroom50.org/CITM-CreativeProgramming-2026/creative-programming/assignments/image-to-dots/accept" },
            ]}
        />
        <span className="mt-2.5 inline-block self-start rounded-full bg-pastel-blue px-2.5 py-1 text-[11px] font-semibold text-chocolate [print-color-adjust:exact]">
          {"Recopilatorio técnico completo CITM UPC BarcelonaTech"}
        </span>
      </>
    ),
  },
  {
    id: "slide15",
    eyebrow: "Actividad 1: 1st Git Assignment",
    title: "Grid de Círculos Concéntricos y Escalado con ofMap",
    body: (
      <CodeSlide
        note={{
          title: "Análisis y Lógica del Algoritmo",
          text: <>Generación de un patrón geométrico mediante el uso de bucles <code>for</code> anidados para distribuir formas en rejilla y escalar radios proporcionalmente a su posición.</>,
        }}
        items={[
          { icon: "fa-border-all", content: <><b>Círculos Grandes y Pequeños:</b> Desplazamiento de coordenadas en $X$ e $Y$ para evitar recortes en las bordes del Canvas y generar el patrón de fondo.</> },
          { icon: "fa-sliders", content: <><b>Remapeo Dinámico (ofMap):</b> Transforma el producto de la fila y la columna (<code>row * column</code>, rango de 0 a 81) para restringir el radio negro de $0$ a $30$ px.</> },
          { icon: "fa-layer-group", content: <><b>Superposición Concéntrica:</b> Dibuja círculos negros sobre los círculos blancos garantizando que nunca sobrepasen el tamaño del círculo base.</> },
        ]}
        aside={
          <div className="flex w-full gap-3">
            <MediaFrame
              src="/images/actividad-1.png"
              alt="Resultado en ejecución: cuadrícula de círculos en escala de grises"
              caption="Resultado en ejecución 1 · 1st Git Assignment"
            />
            <MediaFrame
              src="/images/actividad-1-2.png"
              alt="Resultado en ejecución: cuadrícula con círculos concéntricos"
              caption="Resultado en ejecución 2 · 1st Git Assignment"
            />
          </div>
        }
        code={[
          { id: "act1-run1", label: "Ejecución 1", code: activity1Run1 },
          { id: "act1-run2", label: "Ejecución 2", code: activity1Run2 },
        ]}
        source="Repositorio: creative-programming-1st-git-assignment-fixed-andreacvd"
      />
    ),
  },
];