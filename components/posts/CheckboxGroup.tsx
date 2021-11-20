import { Box, Checkbox, Label } from '@/system';
import { IdProvider } from '@radix-ui/react-id';

const items = [
  { id: '1', label: 'Checkbox 1', onChange: () => {} },
  { id: '2', label: 'Checkbox 2', onChange: () => {} },
  { id: '3', label: 'Checkbox 3', onChange: () => {} },
];
const Checkboxes = () => (
  <>
    {items.map(({ id, label, onChange }) => (
      <Label key={id} css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id={id} onChange={onChange} />
        {label}
      </Label>
    ))}
  </>
);

export const CheckboxGroupAttempt1 = () => (
  <IdProvider>
    <Box css={{ bg: '$gray2', borderRadius: '$3', p: '$4' }}>
      <Box css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkboxes />
      </Box>
    </Box>
  </IdProvider>
);

export const CheckboxGroupAttempt2 = () => (
  <Box css={{ bg: '$gray2', borderRadius: '$3', p: '$4' }}>
    <Box css={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <Checkboxes />
    </Box>
  </Box>
);
