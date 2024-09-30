import ObjectDetection from "./components/ObjectDetection";

const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="font-extrabold text-2xl md:text-6xl tracking-tighter md:px-6 gradient-title">
        Object detection
      </h1>

      <ObjectDetection />
    </main>
  );
};
export default App;
