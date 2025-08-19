import { TDestination } from '@/store/chatAtoms';

type Props = {
  destination: TDestination;
  className?: string;
};

function Destination({ destination, className }: Props) {
  return (
    <div
      className={`flex-1 bg-gray-500/20 max-w-1/2 sm: min-w-1/4 px-4 py-3 rounded-xl ${
        className ?? ''
      }`}
      key={destination.name}
      title={destination.reason}
    >
      <p className='font-extrabold text-xl'>{destination.name}</p>
      {destination.reason && (
        <p className='text-gray-400'>{destination.reason}</p>
      )}
    </div>
  );
}

export default Destination;
