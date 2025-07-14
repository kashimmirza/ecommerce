using PdfSharpCore.Fonts;

namespace ApiOnLamda
{
    public class RobotoFontResolver : IFontResolver
    {
        public byte[] GetFont(string faceName)
        {
            var fontPath = Path.Combine(AppContext.BaseDirectory, "Fonts", "Roboto-Regular.ttf");
            return File.ReadAllBytes(fontPath);
        }

        public FontResolverInfo ResolveTypeface(string familyName, bool isBold, bool isItalic)
        {
            if (familyName.Equals("Roboto", StringComparison.OrdinalIgnoreCase))
            {
                return new FontResolverInfo("Roboto#");
            }

            return null;
        }

        public string DefaultFontName => "Roboto#";
    }

}



