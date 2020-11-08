import { Switch, Route } from "react-router-dom"
import Gallery from "./Gallery"
import News, { AddNewsPage, EditNewsPage } from "./News"
import SocialMedia from "./SocialMedia"
import Contacts from "./Contacts"
import Aboutme from "./Aboutme"

export default function Routing() {
  return (
    <Switch>
      <Route path="/admin" exact={true} component={News}/>
      <Route path="/AddNews"  component={AddNewsPage}/>
      <Route path="/editnews/:postid"  component={EditNewsPage}/>
      <Route path="/socialmedia" component={SocialMedia} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/aboutme" component={Aboutme} />
    </Switch>
  )
}