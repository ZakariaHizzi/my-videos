import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";
import { VSCodeShorts } from "./vscode/VSCodeShorts";
import { VSCodeCover } from "./vscode/VSCodeCover";
import { LangShorts } from "./vscode/lang/LangShorts";
import { LangCover } from "./vscode/lang/LangCover";
import { BrowserShorts } from "./browser/BrowserShorts";
import { BrowserCover } from "./browser/BrowserCover";
import { HtmlShorts } from "./html/HtmlShorts";
import { HtmlCover } from "./html/HtmlCover";
import { HtmlTextShorts } from "./htmltext/HtmlTextShorts";
import { HtmlTextCover } from "./htmltext/HtmlTextCover";
import { HtmlMediaShorts } from "./htmlmedia/HtmlMediaShorts";
import { HtmlMediaCover } from "./htmlmedia/HtmlMediaCover";
import { HtmlTableShorts } from "./htmltable/HtmlTableShorts";
import { HtmlTableCover } from "./htmltable/HtmlTableCover";
import { HtmlFormShorts } from "./htmlform/HtmlFormShorts";
import { HtmlFormCover } from "./htmlform/HtmlFormCover";
import { HtmlLinksShorts } from "./htmllinks/HtmlLinksShorts";
import { HtmlLinksCover } from "./htmllinks/HtmlLinksCover";
import { HtmlDivShorts } from "./htmldiv/HtmlDivShorts";
import { HtmlDivCover } from "./htmldiv/HtmlDivCover";
import { CssShorts } from "./css/CssShorts";
import { CssCover } from "./css/CssCover";
import { CssSelectorsShorts } from "./cssselectors/CssSelectorsShorts";
import { CssSelectorsCover } from "./cssselectors/CssSelectorsCover";
import { CssColorsShorts } from "./csscolors/CssColorsShorts";
import { CssColorsCover } from "./csscolors/CssColorsCover";
import { CssTypographyShorts } from "./csstypography/CssTypographyShorts";
import { CssTypographyCover } from "./csstypography/CssTypographyCover";
import { UniversityCover } from "./university/UniversityCover";
import { UniversityShotsCover } from "./university/UniversityShotsCover";
import { RestaurantCover } from "./restaurant/RestaurantCover";
import { RestaurantShotsCover } from "./restaurant/RestaurantShotsCover";
import { HospitalCover } from "./hospital/HospitalCover";
import { HospitalShotsCover } from "./hospital/HospitalShotsCover";
import { TravelCover } from "./travel/TravelCover";
import { TravelShotsCover } from "./travel/TravelShotsCover";
import { EcommerceCover } from "./ecommerce/EcommerceCover";
import { EcommerceShotsCover } from "./ecommerce/EcommerceShotsCover";

type Props = {};

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="BrowserRender"
        component={BrowserShorts}
        durationInFrames={1419}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BrowserCover"
        component={BrowserCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlBasics"
        component={HtmlShorts}
        durationInFrames={1276}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlBasicsCover"
        component={HtmlCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlText"
        component={HtmlTextShorts}
        durationInFrames={1510}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlTextCover"
        component={HtmlTextCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlMedia"
        component={HtmlMediaShorts}
        durationInFrames={1842}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlMediaCover"
        component={HtmlMediaCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlTable"
        component={HtmlTableShorts}
        durationInFrames={1620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlTableCover"
        component={HtmlTableCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlForm"
        component={HtmlFormShorts}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlFormCover"
        component={HtmlFormCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlLinks"
        component={HtmlLinksShorts}
        durationInFrames={1530}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlLinksCover"
        component={HtmlLinksCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlDiv"
        component={HtmlDivShorts}
        durationInFrames={1470}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HtmlDivCover"
        component={HtmlDivCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CssBasics"
        component={CssShorts}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CssBasicsCover"
        component={CssCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CssSelectors"
        component={CssSelectorsShorts}
        durationInFrames={1560}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CssSelectorsCover"
        component={CssSelectorsCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="CssColors"
        component={CssColorsShorts}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CssColorsCover"
        component={CssColorsCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="CssTypography"
        component={CssTypographyShorts}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CssTypographyCover"
        component={CssTypographyCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="UniversityCover"
        component={UniversityCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="UniversityShotsCover"
        component={UniversityShotsCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="RestaurantCover"
        component={RestaurantCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="HospitalCover"
        component={HospitalCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="TravelCover"
        component={TravelCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="EcommerceCover"
        component={EcommerceCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="RestaurantShotsCover"
        component={RestaurantShotsCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="HospitalShotsCover"
        component={HospitalShotsCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="TravelShotsCover"
        component={TravelShotsCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="EcommerceShotsCover"
        component={EcommerceShotsCover}
        durationInFrames={1}
        fps={30}
        width={1600}
        height={1200}
      />

      <Composition
        id="PromoVertical"
        component={PromoVideo}
        durationInFrames={1164}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VSCodeShort"
        component={VSCodeShorts}
        durationInFrames={975}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VSCodeLang"
        component={LangShorts}
        durationInFrames={1360}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VSCodeCover"
        component={VSCodeCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VSCodeLangCover"
        component={LangCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

export const MyComponent: React.FC<Props> = () => {
  return null;
};
