import { Button } from '../atoms/Button';
import { Suggestion } from '../lib/suggestions';

type Props = {
  suggestion: Suggestion;
  onClick: () => void;
};

export const TripSuggestion = ({ suggestion, onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      {suggestion.origin.stationName} - {suggestion.destination.stationName}
    </Button>
  );
};
