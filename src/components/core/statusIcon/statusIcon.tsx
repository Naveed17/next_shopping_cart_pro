
import type { TypeAttributes, CommonProps } from '@src/@types/common'
import type { ReactNode, JSX } from 'react'
import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react'

export interface StatusIconProps extends CommonProps {
    type: TypeAttributes.Status
    custom?: ReactNode | JSX.Element
    iconColor?: string
}

const ICONS: Record<
    TypeAttributes.Status,
    {
        color: string
        icon: JSX.Element
    }
> = {
    success: {
        color: 'text-success',
        icon: <CheckCircle className="w-[18px] h-[18px]" />,
    },
    info: {
        color: 'text-info',
        icon: <Info className="w-[18px] h-[18px]" />,
    },
    warning: {
        color: 'text-warning',
        icon: <AlertTriangle className="w-[18px] h-[18px]" />,
    },
    danger: {
        color: 'text-error',
        icon: <XCircle className="w-[18px] h-[18px]" />,
    },
}

const StatusIcon = (props: StatusIconProps) => {
    const { type = 'info', custom, iconColor } = props

    const icon = ICONS[type]

    return (
        <span className={`text-2xl ${iconColor || icon.color}`}>
            {custom || icon.icon}
        </span>
    )
}

export default StatusIcon
