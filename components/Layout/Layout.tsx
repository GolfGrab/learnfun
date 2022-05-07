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
  Navbar,
} from '@mantine/core'
// import { useClickOutside } from '@mantine/hooks'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'
import { useDataCTX } from '../../context/Context'

const Layout: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  const data = useDataCTX()
  const { user, githubSignInWithPopup, googleSignInWithPopup, signOut } = data || {}
  // const ref = useClickOutside(() => setOpened(false))

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

                  {user ? (
                    <>
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
                      <Button
                        component="a"
                        size="md"
                        variant="outline"
                        onClick={() => user && signOut && signOut()}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        component="a"
                        size="md"
                        variant="outline"
                        onClick={() => !user && googleSignInWithPopup && googleSignInWithPopup()}
                      >
                        Sign in with Google
                      </Button>

                      <Button
                        component="a"
                        size="md"
                        variant="outline"
                        onClick={() => !user && githubSignInWithPopup && githubSignInWithPopup()}
                      >
                        Sign in with Github
                      </Button>
                    </>
                  )}
                </Group>
              </MediaQuery>

              <ColorSchemeToggle />
            </Group>
          </div>
        </Header>
      }
      navbar={
        opened ? (
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Navbar width={{ base: 250 }} p="xs" fixed>
              <Group
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <Link href="/" passHref>
                  <Button
                    component="a"
                    size="md"
                    variant="subtle"
                    styles={() => ({
                      root: {
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

                {user ? (
                  <>
                    <Link href="/dashboard" passHref>
                      <Button
                        component="a"
                        size="md"
                        variant="subtle"
                        styles={() => ({
                          root: {
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
                    <Button
                      component="a"
                      size="md"
                      variant="outline"
                      onClick={() => user && signOut && signOut()}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      component="a"
                      size="md"
                      variant="outline"
                      onClick={() => !user && googleSignInWithPopup && googleSignInWithPopup()}
                    >
                      Sign in with Google
                    </Button>

                    <Button
                      component="a"
                      size="md"
                      variant="outline"
                      onClick={() => !user && githubSignInWithPopup && githubSignInWithPopup()}
                    >
                      Sign in with Github
                    </Button>
                  </>
                )}
              </Group>
            </Navbar>
          </MediaQuery>
        ) : (
          <></>
        )
      }
    >
      {children}
    </AppShell>
  )
}

export default Layout
