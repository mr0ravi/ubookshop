

export const Block = props => {

    if (!props.state.faves) {
        props.state.faves = []
    }
    if (!props.state.shop) {
        props.state.shop = []
    }

    return <c-c style={{ width: 300, flex: 1, minWidth: 200, position: "relative", border: "1px solid black", borderRadius: "1.5rem", }}>
        <img className={global.styles.hover} src={props.book.imageLink} style={{
            height: 250, width: "100%",
            objectFit: "fill", minWidth: 150, borderRadius: "1.5rem 1.5rem 0 0", top: 0
        }} onClick={() => {
            props.state.form = "bookspace"
            props.state.book = props.book
            props.refresh()
        }} />

        <f-cc style={{ height: 70, marginTop: "-1.2rem" }}>
            <sp-3 />
            {props.book.title}
        </f-cc>
        <br />
        <f-csb style={{width:"100%", paddingLeft:"3.5rem", marginTop:"-0.25rem"}}>
            <c-cc style={{ textAlign: "center", marginTop: "-1.5rem", paddingLeft: "1.5rem" }}>
                <f-15b style={{ color: "green" }}> {props.book.price * 0.8}</f-15b>
                <del> <f-10 style={{ color: "red", display: "inline" }}>price:{props.book.price}</f-10> </del>
            </c-cc>
        </f-csb>
        {props.state.faves.includes(props.book.title) ? <img src="https://cdn.ituring.ir/research/10/heart.png" style={{ height: 30, width: 30, objectFit: "contain", position: "absolute", bottom: 5, right: 5 }} /> : null}
        {props.state.shop.includes(props.book.title) ? <img src="https://cdn.ituring.ir/research/10/tik.png" style={{ height: 30, width: 30, objectFit: "contain", position: "absolute", bottom: 5, left: 5 }} /> : null}
    </c-c>
}