import { Box, Link, Text } from '@/system';

export const Resume = () => {
  return (
    <>
      <Box as="section">
        <Text as="h1" h={1}>
          Ian Duvall
        </Text>
        <Text>Software Engineer</Text>
        <Text>Chicago, IL</Text>
        <Text as={Link} href="ian.w.m.duvall@gmail.com">
          email / ian.w.m.duvall [at] gmail dot com
        </Text>
        <Text as={Link} href="https://www.ianduvall.com">
          www / ianduvall.com
        </Text>
      </Box>
      <Box as="section">
        <Text as="h2" h={2}>
          Experience
        </Text>
        <Text>Sprout Social</Text>
      </Box>
    </>
  );
};
