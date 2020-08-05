export default function currensyFilter(value, style = "decimal") {
	return new Intl.NumberFormat("ru-Ru", { style }).format(value);
}
