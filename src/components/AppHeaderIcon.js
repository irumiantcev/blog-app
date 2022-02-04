import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../theme';

export const AppHeaderIcon = props => (
	<HeaderButton
		{...props}
		iconSize={26}
		IconComponent={Ionicons}
		color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
	/>
);