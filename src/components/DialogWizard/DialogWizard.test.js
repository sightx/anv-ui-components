import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import DialogWizard from './DialogWizard'
import { Banner } from '../../index'

describe('<DialogWizard />', () => {
  it('should render dialog and backdrop when isOpen', () => {
    const { queryByTestId } = render(<DialogWizard isOpen />)
    expect(queryByTestId('dialog')).not.toEqual(null)
    expect(queryByTestId('backdrop')).not.toEqual(null)
  })

  it('should render steps into Wizard', () => {
    const steps = [<div data-testid={'test-child'} />]
    const { queryByTestId } = render(<DialogWizard isOpen steps={steps} />)
    expect(queryByTestId('test-child')).not.toEqual(null)
  })

  it('should render banner into Wizard', () => {
    const steps = [<div />]
    const banner = (
      <Banner isOpen type={'error'}>
        Banner text
      </Banner>
    )
    const { getByText } = render(
      <DialogWizard isOpen steps={steps} banner={banner} />,
    )
    expect(getByText('Banner text')).toBeTruthy()
  })

  it('should change step when clicking next', () => {
    const steps = [
      <div data-testid={'test-child-1'} />,
      <div data-testid={'test-child-2'} />,
    ]
    const { getByText, queryByTestId } = render(
      <DialogWizard isOpen steps={steps} />,
    )
    const nextButton = getByText('Next')
    fireEvent.click(nextButton)
    expect(queryByTestId('test-child-2')).not.toEqual(null)
  })

  it('should change step when clicking back', () => {
    const steps = [
      <div data-testid={'test-child-1'} />,
      <div data-testid={'test-child-2'} />,
      <div data-testid={'test-child-3'} />,
    ]
    const { getByText, getByTestId, queryByTestId } = render(
      <DialogWizard isOpen steps={steps} />,
    )
    const nextButton = getByText('Next')
    fireEvent.click(nextButton)
    expect(queryByTestId('test-child-2')).not.toEqual(null)
    const backButton = getByTestId('back-button')
    fireEvent.click(backButton)
    expect(queryByTestId('test-child-1')).not.toEqual(null)
  })

  it('should render finish button when step is last', () => {
    const steps = [
      <div data-testid={'test-child-1'} />,
      <div data-testid={'test-child-2'} />,
    ]
    const { getByText } = render(<DialogWizard isOpen steps={steps} />)
    const nextButton = getByText('Next')
    fireEvent.click(nextButton)
    expect(getByText('Finish')).not.toEqual(null)
  })

  it('should render custom finish, next and cancel buttons', () => {
    const steps = [
      <div data-testid={'test-child-1'} />,
      <div data-testid={'test-child-2'} />,
    ]
    const { getByText } = render(
      <DialogWizard
        isOpen
        steps={steps}
        nextText={'customNext'}
        finishText={'customFinish'}
      />,
    )
    const nextButton = getByText('customNext')
    fireEvent.click(nextButton)
    expect(getByText('customFinish')).not.toEqual(null)
    expect(getByText('Cancel')).not.toEqual(null)
  })

  it('should not render cancel when cancel text is null', () => {
    const steps = [
      <div data-testid={'test-child-1'} />,
      <div data-testid={'test-child-2'} />,
    ]
    const { queryByText } = render(
      <DialogWizard isOpen steps={steps} cancelText={null} />,
    )
    const nextButton = queryByText('Next')
    fireEvent.click(nextButton)
    expect(queryByText('customCancel')).toEqual(null)
  })

  it('should render overaly content', () => {
    const steps = [<div data-testid={'test-child-1'} />]
    const overlayText = 'Overlay content'
    const overlayContent = <div>{overlayText}</div>
    const { getByText } = render(
      <DialogWizard isOpen steps={steps} overlayContent={overlayContent} />,
    )
    expect(getByText(overlayText)).not.toEqual(null)
  })
})
