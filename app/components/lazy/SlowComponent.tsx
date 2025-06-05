export default function SlowComponent({ label }: { label: string }) {
  return (
    <div className='p-4 border border-green-600 rounded'>
      <h2 className='text-green-400'>{label}</h2>
    </div>
  );
}
