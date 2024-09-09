import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';




export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  getProps(async () => {
    let shop = localStorage.getItem("shop")
    if (shop) {
      state.shop = JSON.parse(shop)
    }
  })
  let styles = global.styles
  let name = "shop"
  state.shop = Array.from(new Set(state.shop))
  let total = 0
  let count = 0
  for (let shop of state.shop) {
    let book = props.books.find(book => book.title == shop)
    if (book) {
      total += (0.8 * book.price as number)
    }
    count += 1
  }


  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspace" ? <WindowFloat title='book details' onclose={() => {
        delete state.form
        refresh()
      }}>

        <f-c>
          <f-15>book's name:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>author:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>

        <f-c>
          <f-15>book's name:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>country:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>language:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15>page's number:</f-15>
          <sp-2 />
          <f-15>{(state.book.pages as number)}</f-15>
        </f-c>

        <g-b style={{ backgroundColor: "#717774" }} onClick={() => {
          if (!state.faves) {
            state.faves = []
          }
          if (state.faves.includes(state.book.title)) {
            state.faves = state.faves.filter(item => item !== state.book.title)
            state.form = null
          }
          else {
            state.faves.push(state.book.title)
            state.form = null
          }
          refresh()
        }}>
          <img src="https://cdn.ituring.ir/research/10/heart.png" style={{ height: 20, width: 20, objectFit: "contain", }} />
        </g-b>
        <g-b style={{
          backgroundColor:
            state.shop.includes(state.book.title) ? "#e64141" : "#2df18f"
        }} onClick={async () => {
          if (!state.shop) {
            state.shop = []
          }
          if (state.shop.includes(state.book.title)) {
            state.shop = state.shop.filter(item => state.book.title !== item)
            state.form = null
            localStorage.setItem("shop", JSON.stringify(state.shop))
            await api("/api/test", state.cart)
            refresh()
          }
          else {
            state.shop.push(state.book.title)
            state.form = null
            localStorage.setItem("shop", JSON.stringify(state.shop))
            refresh()
          }

        }}>
          {state.shop.includes(state.book.title) ? <f-12>remove from cart</f-12> : <f-12>add to cart</f-12>}
        </g-b>

      </WindowFloat> : null
      }

      <Window title='shopping cart' style={{ height: 120, margin: 10, width: "calc(100% - 20px)", backgroundColor: "gainsboro" }}>

        <c-x style={{ position: "relative" }}>
          <f-x>
            <f-cc style={{ margin: 10, paddingRight: 10 }}>
              <f-12><img src='https://cdn.ituring.ir/research/12/shopping-cart%20%28m%29.png' style={{ width: 30, height: 30 }} /></f-12>
              <sp-2 />
              <f-12 style={{ fontSize: 20 }}>count : </f-12>
              <f-12 style={{ fontSize: 20 }}>{(count as number)}</f-12>
            </f-cc>

          </f-x>

          <f-x>
            <f-cc style={{ fontSize: 20, paddingRight: 10 }}>
              <f-12><img src='https://cdn.ituring.ir/research/12/dollars.png' style={{ width: 30, height: 30 }} /></f-12>
              <sp-2 />
              <f-12 style={{ fontSize: 20 }}>total price:<b></b>  </f-12>
              <sp-2 />

              <f-12 style={{ fontSize: 20 }}>{(total as number)}</f-12>
              <sp-2 />
              <f-12 style={{ fontSize: 20 }}>toman</f-12>
            </f-cc>

          </f-x>
          <img src='https://cdn.ituring.ir/research/12/stack-of-books.png' style={{ width: 80, height: 80, position: "absolute", right: 25, top: 7 }} />

        </c-x>


      </Window>

      <Window title={name} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>

        <w-cse style={{ gap: 5, padding: 5 }}>

          {props.books.map(book => {
            return <Block book={book} state={state} refresh={refresh} />

          })}
        </w-cse>
      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()
  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
  }

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}