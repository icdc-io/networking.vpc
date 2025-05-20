import { Checkbox } from "container/Checkbox";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "container/Form";
import Popup from "container/Popup";
import { CircleHelp } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CheckboxFormField = ({ fieldInfo, form }) => {
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
					<FormItem>
						<div className="flex flex-row items-center gap-2">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel className="flex items-center">
								<b>{t(fieldInfo.label)}</b>&nbsp;
								{fieldInfo.clarification && (
									<Popup content={t(fieldInfo.clarification)}>
										<button type="button">
											<CircleHelp size={16} />
										</button>
									</Popup>
								)}
							</FormLabel>
						</div>
						{fieldInfo.description && (
							<FormDescription>{t(fieldInfo.description)}</FormDescription>
						)}
						{error?.message && <FormMessage>{t(error.message)}</FormMessage>}
					</FormItem>
				);
			}}
		/>
	);
};
