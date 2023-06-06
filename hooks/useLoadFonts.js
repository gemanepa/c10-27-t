import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import UbuntuBold from '../assets/fonts/Ubuntu-Bold.ttf';
import UbuntuBoldItalic from '../assets/fonts/Ubuntu-BoldItalic.ttf';
import UbuntuItalic from '../assets/fonts/Ubuntu-Italic.ttf';
import UbuntuLight from '../assets/fonts/Ubuntu-Light.ttf';
import UbuntuLightItalic from '../assets/fonts/Ubuntu-LightItalic.ttf';
import UbuntuMedium from '../assets/fonts/Ubuntu-Medium.ttf';
import UbuntuMediumItalic from '../assets/fonts/Ubuntu-MediumItalic.ttf';
import UbuntuRegular from '../assets/fonts/Ubuntu-Regular.ttf';

SplashScreen.preventAutoHideAsync();

function useLoadFonts() {
  const [fontLoading, setFontLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'ubuntu-bold': UbuntuBold,
        'ubuntu-boldItalic': UbuntuBoldItalic,
        'ubuntu-italic': UbuntuItalic,
        'ubuntu-light': UbuntuLight,
        'ubuntu-lightItalic': UbuntuLightItalic,
        'ubuntu-medium': UbuntuMedium,
        'ubuntu-mediumItalic': UbuntuMediumItalic,
        'ubuntu-regular': UbuntuRegular,
      });
      setFontLoading(false);
      await SplashScreen.hideAsync();
    }
    loadFonts();
  }, []);

  return fontLoading;
}

export default useLoadFonts;
