import { useState } from 'react'
import Link from 'next/link'
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Button,
  Group,
} from '@mantine/core'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'

const Layout: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()

  return (
    <AppShell
      padding="md"
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Title align="center">
                <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
                  <Text inherit variant="gradient" component="div">
                    Learn Fun
                  </Text>
                </MediaQuery>
                <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                  <Text inherit variant="gradient" component="div">
                    Learn Fun Run Together
                  </Text>
                </MediaQuery>
              </Title>
            </div>
            <Group
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Group>
                  <Link href="/" passHref>
                    <Button
                      component="a"
                      size="md"
                      variant="subtle"
                      styles={() => ({
                        root: {
                          paddingLeft: 4,
                          paddingRight: 4,
                          '&:hover': {
                            backgroundColor: '#00000000',
                            textDecoration: 'underline',
                          },
                        },
                      })}
                    >
                      HomePage
                    </Button>
                  </Link>
                  <Link href="/dashboard" passHref>
                    <Button
                      component="a"
                      size="md"
                      variant="subtle"
                      styles={() => ({
                        root: {
                          paddingLeft: 4,
                          paddingRight: 16,
                          '&:hover': {
                            backgroundColor: '#00000000',
                            textDecoration: 'underline',
                          },
                        },
                      })}
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button component="a" size="md" variant="outline">
                    Sign in with Google
                  </Button>

                  <Button component="a" size="md">
                    Sign in with Github
                  </Button>
                </Group>
              </MediaQuery>

              <ColorSchemeToggle />
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default Layout
