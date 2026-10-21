import type { SlideDef } from "@/lib/types";
import CoverBody from "@/components/slide/templates/CoverBody";
import CodeSlide from "@/components/slide/templates/CodeSlide";
import NoteCard from "@/components/slide/NoteCard";

const lifecycle = `// ofApp.cpp
void ofApp::setup() {
    ofSetFrameRate(60);
    ofSetBackgroundColor(15, 23, 42);
}

void ofApp::update() { xPos += speed; }

void ofApp::draw() {
    ofSetColor(37, 99, 235);
    ofDrawCircle(xPos, ofGetHeight() / 2, 25);
}`;

const grid = `// Grid 2D de círculos
void ofApp::draw() {
    int cols = 16, rows = 10;
    float sx = ofGetWidth() / cols;
    float sy = ofGetHeight() / rows;

    for (int i = 0; i < cols; i++) {
        for (int j = 0; j < rows; j++) {
            float r = ofMap(i + j, 0, cols + rows, 2, 14);
            ofDrawCircle(i * sx + sx / 2, j * sy + sy / 2, r);
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
        subtitle="Guía técnica: patrones de código, lógica algorítmica y ejercicios resueltos."
      />
    ),
  },
  {
    id: "slide2",
    eyebrow: "Tema 1: Arquitectura y Ciclo de Vida",
    title: "Estructura Interna de ofApp",
    body: (
      <CodeSlide
        note={{
          title: "Lógica del Bucle Principal (60 FPS)",
          text: "OpenFrameworks separa el cálculo de datos de la renderización gráfica.",
        }}
        items={[
          { icon: "fa-play", content: <><b>setup():</b> Inicializa memoria, assets y framerate.</> },
          { icon: "fa-arrows-rotate", content: <><b>update():</b> Calcula el estado lógico antes de pintar.</> },
          { icon: "fa-paintbrush", content: <><b>draw():</b> Renderiza en pantalla.</> },
        ]}
        code={lifecycle}
        source="Fuente: Creative Programming OF 01.pdf"
      />
    ),
  },
  {
    id: "slide3",
    eyebrow: "Tema 2: Bucles y Patrones Geométricos",
    title: "Control de Iteraciones: For y Rejillas 2D",
    body: (
      <CodeSlide
        note={{
          title: "Algoritmos de Repetición Espacial",
          text: "Los bucles generan cientos de elementos visuales en un único fotograma.",
        }}
        items={[
          { icon: "fa-border-all", content: <><b>Bucles Anidados:</b> filas dentro de columnas cubren el Canvas.</> },
          { icon: "fa-sliders", content: <><b>Modulación:</b> los contadores dentro de <code>ofMap</code> escalan radios y colores.</> },
        ]}
        code={grid}
        source="Fuente: Creative Programming OF 02 - Loops and buffers.pdf"
      />
    ),
  },
  {
    id: "slide4",
    variant: "dark",
    eyebrow: "Repositorio de Ejercicios",
    title: "Acceso Directo a Asignaciones",
    body: (
      <NoteCard title="GitHub Classroom">
        Aquí irán los enlaces a las asignaciones del curso.
      </NoteCard>
    ),
  },
];