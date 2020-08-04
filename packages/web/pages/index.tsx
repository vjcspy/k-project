import foo from '@vjcspy/foo';
import Bar from '@vjcspy/bar';

export default function Home() {
  return (
    <div>
      Imported modules from another workspace:
      <pre>{foo}</pre>
      <Bar/>
    </div>
  );
}
