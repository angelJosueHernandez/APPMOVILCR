import React from 'react';
import { render } from '@testing-library/react-native';
import AnimatedSplashScreenP from '@/app/screens/AnimatedSplashScreenP';

describe('AnimatedSplashScreen', () => {
  it('renderiza la pantalla de splash', () => {
    const { getByTestId } = render(<AnimatedSplashScreenP onAnimationEnd={() => {}} isTesting={true} />);
    expect(getByTestId('pantalla-de-splash')).toBeDefined();
  });

  it('llama a la devolución de llamada onAnimationEnd inmediatamente en pruebas', () => {
    const mockOnAnimationEnd = jest.fn();

    render(<AnimatedSplashScreenP onAnimationEnd={mockOnAnimationEnd} isTesting={true} />);
    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1); // onAnimationEnd debe llamarse de inmediato
  });
});
