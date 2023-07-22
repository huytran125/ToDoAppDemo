import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '@theme';

export const Icons = {
  plus: {
    Icon: (props: IconProps) => <Plus {...props} />,
  },
  more: {
    Icon: (props: IconProps) => <More {...props} />,
  },
  trash: {
    Icon: (props: IconProps) => <Trash {...props} />,
  },
  check: {
    Icon: (props: IconProps) => <Check {...props} />,
  },
};

export type SVGIconProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
  fill?: string;
  stroke?: string;
  name: keyof typeof Icons;
};
export type IconProps = Omit<SVGIconProps, 'name' | 'style'>;

const SVGicon: React.FC<SVGIconProps> = props => {
  const {name, style} = props;
  const {Icon} = Icons?.[name];
  return (
    <View style={style}>
      <Icon {...props} />
    </View>
  );
};

function Plus(props: IconProps) {
  const {size = 22, fill = Colors.Main.White} = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.952 3.822c.492 0 .891.4.891.891V17.19a.891.891 0 11-1.782 0V4.713c0-.492.399-.89.891-.89z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.823 10.952c0-.492.399-.892.891-.892H17.19a.891.891 0 110 1.783H4.714a.891.891 0 01-.891-.891z"
        fill={fill}
      />
    </Svg>
  );
}

function More(props: IconProps) {
  const {size = 24, stroke = Colors.Main.White} = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.005 16.005v-.01M12.005 12.005v-.01M12.005 8.005v-.01"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
function Trash(props: IconProps) {
  const {size = 24, fill = Colors.Main.White} = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 27 23" fill="none">
      <Path
        d="M17.638 16.7817H22.9611V19.5635H17.638V16.7817ZM17.638 5.65446H26.9534V8.43628H17.638V5.65446ZM17.638 11.2181H25.6226V13.9999H17.638V11.2181ZM1.66895 19.5635C1.66895 21.0935 2.86664 22.3454 4.33047 22.3454H12.315C13.7789 22.3454 14.9765 21.0935 14.9765 19.5635V5.65446H1.66895V19.5635ZM4.33047 8.43628H12.315V19.5635H4.33047V8.43628ZM10.9843 0.0908203H5.66123L4.33047 1.48173H0.338196V4.26355H16.3073V1.48173H12.315L10.9843 0.0908203Z"
        fill={fill}
      />
    </Svg>
  );
}

function Check(props: IconProps) {
  const {size = 24, stroke = Colors.Main.White} = props;

  return (
    <Svg width={size} height={size} viewBox="0 0 29 20" fill="none">
      <Path
        d="M1.75 10.6243L8.97194 17.8463V17.8463C9.72382 18.5982 10.9428 18.5982 11.6947 17.8463V17.8463L27.5 2.04102"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export {SVGicon};
