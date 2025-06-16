import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerTitle,
} from "../styles/banner";

export default function Banner() {
  const theme = useTheme();

  return (
    <BannerContainer>
      <BannerImage src="/images/banner/plant_pots.jpg.webp" />
      <BannerContent>
        <Typography
          variant="h6"
          fontFamily={"Lugrasimo"}
          fontStyle={"italic"}
          fontWeight={"bold"}
        >
          La tua oasi verde
        </Typography>
        <BannerTitle variant="h3">Green Vibes 🌿</BannerTitle>
        <BannerDescription variant="subtitle">
          Trasforma ogni angolo della tua casa con il verde delle nostre piante.
          Scopri la nostra selezione di piante uniche, perfette per ogni spazio
          e stile.
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  );
}
