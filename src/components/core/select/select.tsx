
import cn from '@src/utils/classNames'
import ReactSelect from 'react-select'
import CreatableSelect from 'react-select/creatable'
import AsyncSelect from 'react-select/async'
import { useConfig } from '@lib/configProvider'
import { useForm, useFormItem } from '../form/context';
import DefaultOption from './option'
import Spinner from '@components/core/spinner'
import { CONTROL_SIZES } from '@src/utils/constants'
import type { CommonProps, TypeAttributes } from '@src/@types/common'
import type {
    Props as ReactSelectProps,
    StylesConfig,
    ClassNamesConfig,
    GroupBase,
} from 'react-select'
import type { AsyncProps } from 'react-select/async'
import type { CreatableProps } from 'react-select/creatable'
import type { Ref, JSX } from 'react'
import { ChevronDown, X } from 'lucide-react'

const DefaultDropdownIndicator = () => {
    return (
        <div className="select-dropdown-indicator">
            <ChevronDown className="h-4 w-4" />
        </div>
    )
}

interface DefaultClearIndicatorProps {
    innerProps: JSX.IntrinsicElements['div']
    ref: Ref<HTMLElement>
}

const DefaultClearIndicator = ({
    innerProps: { ref, ...restInnerProps },
}: DefaultClearIndicatorProps) => {
    return (
        <div {...restInnerProps} ref={ref}>
            <div className="select-clear-indicator text-lg px-2 cursor-pointer">
                <X className="h-6 w-6" />
            </div>
        </div>
    )
}

interface DefaultLoadingIndicatorProps {
    selectProps: { themeColor?: string }
}

const DefaultLoadingIndicator = ({
    selectProps,
}: DefaultLoadingIndicatorProps) => {
    const { themeColor } = selectProps
    return (
        <Spinner />
    )
}

export type SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> = CommonProps &
    ReactSelectProps<Option, IsMulti, Group> &
    AsyncProps<Option, IsMulti, Group> &
    CreatableProps<Option, IsMulti, Group> & {
        invalid?: boolean
        size?: TypeAttributes.ControlSize
        field?: any
        componentAs?: ReactSelect | CreatableSelect | AsyncSelect
        isSearchable?: boolean // <-- add this line
    }

function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectProps<Option, IsMulti, Group>) {
    const {
        components,
        componentAs: Component = ReactSelect,
        size,
        styles,
        className,
        classNames,
        field,
        invalid,
        isSearchable = true, // <-- default to true
        ...rest
    } = props

    const { controlSize } = useConfig()
    const formControlSize = useForm()?.size
    const formItemInvalid = useFormItem()?.invalid


    const selectSize = (size ||

        formControlSize ||
        controlSize) as keyof typeof CONTROL_SIZES

    const isSelectInvalid = invalid || formItemInvalid

    const selectClass = cn(`select select-${selectSize}`, className)

    return (
        <Component<Option, IsMulti, Group>
            className={selectClass}
            classNames={
                {
                    control: (state) =>
                        cn(
                            'flex items-center justify-between border border-gray-200/50 dark:border-gray-700/50 rounded-xl transition-all duration-200 backdrop-blur-sm',
                            CONTROL_SIZES[selectSize]?.minH || 'min-h-12',
                            state.isDisabled && 'opacity-50 cursor-not-allowed',
                            (() => {
                                const classes: string[] = [
                                    'bg-white/80 dark:bg-gray-800/80',
                                ]

                                const { isFocused } = state

                                if (isFocused) {
                                    classes.push(
                                        'ring-2 ring-blue-500/30 border-blue-500/50 bg-white/90 dark:bg-gray-800/90',
                                    )
                                }

                                if (isSelectInvalid) {
                                    classes.push(
                                        'bg-red-50/80 dark:bg-red-900/20 border-red-500/50',
                                    )
                                }

                                if (isFocused && isSelectInvalid) {
                                    classes.push('ring-red-500/30 border-red-500/50')
                                }

                                return classes
                            })(),
                        ),
                    valueContainer: ({ isMulti, hasValue, selectProps }) =>
                        cn(
                            'flex items-center flex-1 flex-wrap relative overflow-hidden px-3 gap-y-1',
                        ),
                    input: ({ value, isDisabled }) =>
                        cn(
                            'select-input-container inline-grid flex-auto text-gray-800 dark:text-gray-100 font-semibold',
                            isDisabled ? 'invisible' : 'visible',
                            value && '[transform:translateZ(0)]',
                        ),
                    placeholder: () =>
                        cn(
                            'select-placeholder font-medium text-sm',
                            isSelectInvalid ? 'text-red-500' : 'text-gray-500 dark:text-gray-400',
                        ),
                    indicatorsContainer: () => 'flex items-center px-3 text-gray-500 dark:text-gray-400',
                    singleValue: () => 'select-single-value max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-gray-900 dark:text-white font-medium text-sm',
                    multiValue: () => 'flex rounded-lg mx-0.5 font-bold border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100',
                    multiValueLabel: () => 'text-xs ltr:pl-2 rtl:pr-2 py-1.5 flex items-center',
                    multiValueRemove: () => 'flex items-center ltr:pr-2 ltr:pl-1 rtl:pr-1 rtl:pl-2',
                    menu: () => 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl my-2 px-2 py-2 min-h-[50px] border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-black/10 dark:shadow-black/30',
                    ...classNames,
                } as ClassNamesConfig<Option, IsMulti, Group>
            }
            classNamePrefix={'select'}
            styles={
                {
                    control: () => ({}),
                    valueContainer: () => ({}),
                    input: ({
                        margin,
                        paddingTop,
                        paddingBottom,
                        ...provided
                    }) => ({ ...provided }),
                    placeholder: () => ({}),
                    singleValue: () => ({}),
                    multiValue: () => ({}),
                    multiValueLabel: () => ({}),
                    multiValueRemove: () => ({}),
                    menu: ({
                        backgroundColor,
                        marginTop,
                        marginBottom,
                        border,
                        borderRadius,
                        boxShadow,
                        ...provided
                    }) => ({ ...provided, zIndex: 50 }),
                    ...styles,
                } as StylesConfig<Option, IsMulti, Group>
            }
            components={{
                IndicatorSeparator: () => null,
                Option: DefaultOption,
                LoadingIndicator: <>loading...</>,
                DropdownIndicator: DefaultDropdownIndicator,
                ClearIndicator: DefaultClearIndicator,
                ...components,
            }}
            isSearchable={isSearchable} // <-- pass prop
            {...field}
            {...rest}
        />
    )
}

export default Select
