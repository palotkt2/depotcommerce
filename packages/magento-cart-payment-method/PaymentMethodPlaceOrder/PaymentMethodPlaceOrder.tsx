import { UseFormComposeOptions } from '@reachdigital/react-hook-form'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodPlaceOrderProps = Pick<UseFormComposeOptions, 'step'>

export default function PaymentMethodPlaceOrder(props: PaymentMethodPlaceOrderProps) {
  const { step } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  if (!selectedModule || !selectedMethod?.code) return null
  return <selectedModule.PaymentPlaceOrder {...selectedMethod} step={step} />
}
