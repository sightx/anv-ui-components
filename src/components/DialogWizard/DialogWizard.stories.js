import React, { useState } from 'react'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Button, Banner } from '../../index'
import { centerDecorator } from '../../utils/storybook/decorators'
import styles from '../../storybook/wizard.module.scss'
import DialogWizard from './DialogWizard'

export default {
  title: 'Content/Dialogs/DialogWizard',
  component: DialogWizard,
  decorators: [centerDecorator],
}

export const Basic = () => {
  const steps = [<div>Step 1</div>, <div>Step 2</div>, <div>Step 3</div>]
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const disableBackdropClick = boolean(
    'Disable backdrop click to close dialog',
    false,
  )
  const disableEscapeKeyDown = boolean(
    'Disable escape key press to close dialog',
    false,
  )

  return (
    <div>
      <Button
        aria-controls='menu-story-default'
        aria-haspopup='true'
        onClick={handleOpenDialog}
      >
        Open Wizard
      </Button>
      <DialogWizard
        className={styles.wizardExample}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onNextClick={action('next')}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        headerTitle={'Header title'}
        footerMessage={
          'Opps! Connection failed, Please re-check your details and try again'
        }
        steps={steps}
      />
    </div>
  )
}

export const WithBanner = () => {
  const steps = [<div>Step 1</div>, <div>Step 2</div>, <div>Step 3</div>]
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const disableBackdropClick = boolean(
    'Disable backdrop click to close dialog',
    false,
  )
  const disableEscapeKeyDown = boolean(
    'Disable escape key press to close dialog',
    false,
  )

  const banner = (
    <Banner isOpen type={'error'}>
      Banner text
    </Banner>
  )

  return (
    <div>
      <Button
        aria-controls='menu-story-default'
        aria-haspopup='true'
        onClick={handleOpenDialog}
      >
        Open Wizard
      </Button>
      <DialogWizard
        className={styles.wizardExample}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onNextClick={action('next')}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        headerTitle={'Header title'}
        steps={steps}
        banner={banner}
      />
    </div>
  )
}

export const WithOverlay = () => {
  const steps = [<div>Step 1</div>, <div>Step 2</div>, <div>Step 3</div>]

  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const disableBackdropClick = boolean(
    'Disable backdrop click to close dialog',
    false,
  )
  const disableEscapeKeyDown = boolean(
    'Disable escape key press to close dialog',
    false,
  )

  const renderOverlayContent = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        This is an overlay content
      </div>
    )
  }

  return (
    <div>
      <Button
        aria-controls='menu-story-default'
        aria-haspopup='true'
        onClick={handleOpenDialog}
      >
        Open Wizard
      </Button>
      <DialogWizard
        className={styles.wizardExample}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        headerTitle={'Header title'}
        footerMessage={
          'Opps! Connection failed, Please re-check your details and try again'
        }
        steps={steps}
        onNextClick={action('next')}
        overlayContent={renderOverlayContent()}
      />
    </div>
  )
}

export const Uncontrolled = () => {
  const steps = [<div>Step 1</div>, <div>Step 2</div>, <div>Step 3</div>]

  const [isDialogOpen, setDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const disableBackdropClick = boolean(
    'Disable backdrop click to close dialog',
    false,
  )
  const disableEscapeKeyDown = boolean(
    'Disable escape key press to close dialog',
    false,
  )

  const onNextClick = nextStep => {
    setCurrentStep(nextStep)
  }

  return (
    <div>
      <Button
        aria-controls='menu-story-default'
        aria-haspopup='true'
        onClick={handleOpenDialog}
      >
        Open Wizard
      </Button>
      <DialogWizard
        className={styles.wizardExample}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onNextClick={onNextClick}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        headerTitle={'Header title'}
        footerMessage={
          'Opps! Connection failed, Please re-check your details and try again'
        }
        steps={steps}
        currentStep={currentStep}
      />
    </div>
  )
}
