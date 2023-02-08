import useClickOutside from '@hooks/useClickOutside'
import { useTheme } from '@hooks/useTheme'
import { useLogoutMutation } from '@redux/api/auth/authSlice'
import { ActionIcon, Menu, Switch } from '@ui-kit'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { IoBookmarkOutline, IoLanguageOutline, IoLogOutOutline, IoMoonOutline, IoPersonOutline } from 'react-icons/io5'
import { MdOutlineMenu } from 'react-icons/md'
import { useTranslation } from 'next-i18next'

const LANGUAGES = {
  en: 'английский',
  ru: 'russian',
}

const MenuButton = () => {
  const router = useRouter()
  const { theme, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<null | HTMLDivElement>(null)
  const [logout] = useLogoutMutation()
  const { t } = useTranslation(['sidebar'])

  useClickOutside(menuRef, () => setIsOpen(false))

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then(() => router.replace(`/`))
      .catch((error: any) => console.error(error))
  }

  const handleTheme = () => {
    if (theme === 'dark') {
      changeTheme('light')
    } else {
      changeTheme('dark')
    }
  }

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'ru' : 'en'
  const language = LANGUAGES[changeTo]

  return (
    <div ref={menuRef}>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen}>
        <Menu.Target>
          <ActionIcon>
            <MdOutlineMenu />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='text-text-color'>
          <Menu.Item icon={<IoBookmarkOutline size='20' />}>{t('menu.saved-messages')}</Menu.Item>
          <Menu.Item icon={<IoPersonOutline size='20' />}>{t('menu.contacts')}</Menu.Item>
          <Menu.Item icon={<IoMoonOutline size='20' />}>
            <div className='flex w-full items-center justify-between'>
              {t('menu.night-mode')}
              <Switch onChange={handleTheme} checked={theme === 'dark'} />
            </div>
          </Menu.Item>
          <Menu.Item onClick={() => onToggleLanguageClick(changeTo)} icon={<IoLanguageOutline size='20' />}>
            {t('menu.change-locale', { changeTo: language })}
          </Menu.Item>
          <Menu.Item onClick={handleLogout} icon={<IoLogOutOutline size='20' />}>
            {t('menu.logout')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default MenuButton
