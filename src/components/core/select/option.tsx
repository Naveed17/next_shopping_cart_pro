import { Check } from 'lucide-react'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import type { OptionProps as ReactSelectOptionProps } from 'react-select'

export type DefaultOptionProps<T> = {
    customLabel?: (data: T, label: string) => ReactNode
}

const Option = <T,>(
    props: ReactSelectOptionProps<T> & DefaultOptionProps<T>,
) => {
    const { innerProps, label, isSelected, isDisabled, data, customLabel } =
        props

    return (
        <div
            className={classNames(
                'flex items-center justify-between py-2.5 px-3 font-medium cursor-default rounded-lg transition-all duration-150',
                !isDisabled &&
                !isSelected &&
                'hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm',
                isSelected && 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 backdrop-blur-sm',
                isDisabled && 'opacity-50 cursor-not-allowed',
                'text-gray-700 dark:text-gray-200',
            )}
            {...innerProps}
        >
            {customLabel ? (
                customLabel(data, label)
            ) : (
                <span className="ml-2">{label}</span>
            )}
            {isSelected && <Check className="h-6 w-6" />}
        </div>
    )
}

export default Option
