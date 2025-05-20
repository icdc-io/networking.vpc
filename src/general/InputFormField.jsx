import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "container/Form";
import { Input } from "container/Input";
import { Label } from "container/Label";
import Popup from "container/Popup";
import { CircleHelp } from "lucide-react";
import { useTranslation } from "react-i18next";

export const InputFormField = ({ fieldInfo, form }) => {
	const { t } = useTranslation();

	return (
		<FormField
			key={fieldInfo.name}
			control={form.control}
			name={fieldInfo.name}
			rules={fieldInfo.rules}
			render={({ field }) => {
				const { error } = form.getFieldState(fieldInfo.name);
				return (
					<FormItem className={fieldInfo.className}>
						<FormLabel className="flex items-center">
							<b>{t(fieldInfo.label)}</b>
							&nbsp;
							{fieldInfo.clarification && (
								<Popup content={t(fieldInfo.clarification)}>
									<button type="button">
										<CircleHelp size={16} />
									</button>
								</Popup>
							)}
						</FormLabel>
						<FormControl>
							<Input
								placeholder={t(fieldInfo.placeholder)}
								{...field}
								value={String(field.value)}
								disabled={fieldInfo.disabled}
								maxLength={fieldInfo.rules?.maxLength}
							/>
						</FormControl>
						{error && <FormMessage>{t(error.message)}</FormMessage>}
						{fieldInfo.description && (
							<FormDescription>{t(fieldInfo.description)}</FormDescription>
						)}
						{(fieldInfo.limit || fieldInfo.limit === 0) && (
							<div className="limit-tip">
								<Label>Max.</Label>
								<span>{fieldInfo.limit}</span>
							</div>
						)}
					</FormItem>
				);
			}}
		/>
	);
};
