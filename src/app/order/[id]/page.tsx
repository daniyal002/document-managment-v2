import NewOrder  from "@/components/Order/NewOrder/NewOrder"

export default function OrderItemPage({ params }: { params: { id: string } }){
    return(
        <>
        <NewOrder id={params.id}/>
        </>
    )
}