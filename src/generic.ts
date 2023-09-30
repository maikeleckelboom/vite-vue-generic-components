import { defineComponent, h, VNode } from 'vue';
import BaseGenericComponent from './components/BaseGenericComponent.vue';
import { ExtractComponentProps } from './types';

type NonGenericProps = Omit<
  ExtractComponentProps<typeof BaseGenericComponent>,
  'value' | 'onChanged'
>;

interface GenericProps<TValue> extends NonGenericProps {
  value: TValue;
}

interface GenericSlots<TValue> {
  currentValue: TValue;
  oldValue: TValue;
}

export function useGenericComponent<TValue = unknown>() {
  const wrapper = defineComponent((props: GenericProps<TValue>, { slots }) => {
    // Returning functions in `setup` means this is the render function
    return () => {
      // We pass the slots through
      return h(BaseGenericComponent, props, slots);
    };
  });

  return wrapper as typeof wrapper & {
    new (): {
      $emit: {
        (e: 'changed', value: TValue): void;
      };
      $slots: {
        default: (arg: GenericSlots<TValue>) => VNode[];
      };
    };
  };
}
