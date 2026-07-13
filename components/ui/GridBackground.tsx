export default function GridBackground() {
  return (
    <div
      className="
        absolute inset-0
        bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
        bg-[size:60px_60px]
        [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]
      "
    />
  );
}