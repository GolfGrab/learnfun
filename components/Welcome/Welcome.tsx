import { Title, Text } from '@mantine/core'

const Welcome: React.FC = () => (
  <>
    <Title align="center" mt={100}>
      Welcome to{' '}
      <Text inherit variant="gradient" component="span">
        Learn Fun Run Together
      </Text>
    </Title>
    <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae iure, earum
      aliquid quia, dolor excepturi rerum nihil pariatur itaque ipsa. Voluptas ipsa dolore veniam
      iure, nihil non eius officia?
    </Text>
  </>
)

export default Welcome
