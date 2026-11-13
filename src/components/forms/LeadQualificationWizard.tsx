import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Upload,
  AlertCircle,
  Sparkles,
  Home,
  Building2,
  Layers,
  Armchair,
  Grid,
  Sun,
  HardHat,
  Flame,
  ShieldCheck,
  HelpCircle,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Camera,
  Trash2
} from 'lucide-react';
import { SiteConfig, LeadSubmission } from '../../config/types';
import { checkTerritoryCoverage } from '../../config/locations.config';
import { formatQuebecPhone, formatPostalCode, isValidQuebecPostalCode, generateLeadId } from '../../lib/utils';
import { submitLead, uploadLeadPhotos } from '../../lib/leadsStore';
import { LeadSuccessModal } from './LeadSuccessModal';

interface WizardProps {
  siteConfig: SiteConfig;
  initialServiceId?: string;
  onLeadSubmitted?: (lead: LeadSubmission) => void;
}

export const LeadQualificationWizard: React.FC<WizardProps> = ({
  siteConfig,
  initialServiceId,
  onLeadSubmitted
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || 'nettoyage-residentiel');
  const [otherServiceText, setOtherServiceText] = useState('');
  const [propertyType, setPropertyType] = useState('Maison');
  const [specificNeeds, setSpecificNeeds] = useState<string[]>([]);
  const [otherNeedText, setOtherNeedText] = useState('');
  
  // Dimensions
  const [roomsCount, setRoomsCount] = useState<number>(3);
  const [approximateSqFt, setApproximateSqFt] = useState<string>('1200');
  const [floorCount, setFloorCount] = useState<number>(1);
  const [itemCount, setItemCount] = useState<number>(1);
  const [dimensionNotes, setDimensionNotes] = useState('');

  // Timeframe
  const [timeframe, setTimeframe] = useState('Cette semaine');
  const [preferredDate, setPreferredDate] = useState('');

  // Customer Contact
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [comments, setComments] = useState('');

  // Photos
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ name: string; size: string }>>([]);

  // Consents (Loi 25)
  const [privacyConsentAccepted, setPrivacyConsentAccepted] = useState(false);
  const [marketingConsentAccepted, setMarketingConsentAccepted] = useState(false);

  // Validation errors
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  // Calculate live territory check
  const territoryCheck = checkTerritoryCoverage(postalCode);

  // Services available from config (only active ones)
  const activeServices = siteConfig.services.filter(s => s.isActive);

  // Step 1: Services list
  const serviceOptions = [
    { id: 'nettoyage-residentiel', label: 'Nettoyage résidentiel', icon: Home },
    { id: 'nettoyage-commercial', label: 'Nettoyage commercial & bureaux', icon: Building2 },
    { id: 'nettoyage-de-tapis', label: 'Nettoyage de tapis à la vapeur', icon: Layers },
    { id: 'nettoyage-de-meubles-rembourres', label: 'Nettoyage de meubles & sofas', icon: Armchair },
    { id: 'nettoyage-de-planchers', label: 'Nettoyage de planchers & coulis', icon: Grid },
    { id: 'nettoyage-de-vitres', label: 'Lavage de vitres', icon: Sun },
    { id: 'nettoyage-apres-construction', label: 'Nettoyage après travaux / construction', icon: HardHat },
    { id: 'nettoyage-apres-sinistre', label: 'Nettoyage après sinistre / urgence', icon: Flame },
    { id: 'autre', label: 'Autre besoin spécialisé', icon: Sparkles }
  ];

  // Step 2: Property types
  const propertyTypeOptions = [
    'Maison unifamiliale',
    'Condo',
    'Appartement / Duplex',
    'Bureau professionnel',
    'Commerce au détail',
    'Immeuble à logements',
    'Édifice corporatif',
    'Entrepôt / Industrie',
    'Autre'
  ];

  // Step 3: Dynamic specific needs based on service
  const getDynamicNeeds = () => {
    if (selectedServiceId === 'nettoyage-de-tapis' || selectedServiceId === 'nettoyage-de-carpettes') {
      return ['Tapis résidentiel complet', 'Tapis commercial à fort passage', 'Carpettes délicates / laine', 'Tapis collés au sol', 'Dalles de tapis amovibles', 'Élimination de taches incrustées', 'Neutralisation d’odeurs', 'Saleté importante / dégraissage'];
    }
    if (selectedServiceId === 'nettoyage-de-meubles-rembourres') {
      return ['Sofa 2 ou 3 places', 'Divan sectionnel', 'Fauteuils inclinables', 'Chaises de salle à manger', 'Matelas grand lit (Queen) ou très grand lit (King)', 'Mobilier commercial d’attente', 'Cuir délicat'];
    }
    if (selectedServiceId === 'nettoyage-de-planchers' || selectedServiceId === 'decapage-et-cirage-de-planchers') {
      return ['Joints de coulis de céramique', 'Décapage et cirage de tuiles VCT', 'Planchers de bois franc', 'Plancher de béton poli', 'Nettoyage en profondeur de vinyle'];
    }
    if (selectedServiceId === 'nettoyage-commercial') {
      return ['Désinfection quotidienne des bureaux', 'Sanitaires et vestiaires', 'Corridors et aires d’accueil', 'Nettoyage soirs ou fins de semaine', 'Gestion des poubelles & recyclage'];
    }
    // Default residential / general
    return [
      'Cuisine complète & électroménagers',
      'Salles de bain & détartrage de douches',
      'Chambres à coucher',
      'Aires communes & salons',
      'Intérieur des armoires',
      'Ménage de déménagement (emménagement/déménagement)',
      'Grand ménage saisonnier de printemps'
    ];
  };

  // Step 5: Timeframe options
  const timeframeOptions = [
    'Dès que possible (Urgence)',
    'Cette semaine',
    'Dans les deux prochaines semaines',
    'Dans le mois',
    'Service régulier récurrent',
    'Date précise à déterminer'
  ];

  const handleToggleNeed = (need: string) => {
    setSpecificNeeds(prev =>
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newItems = files.map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} Mo`
    }));
    setUploadedPhotos(prev => [...prev, ...newItems].slice(0, 5)); // max 5 photos
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    const errors: string[] = [];
    if (step === 1) {
      if (!selectedServiceId) errors.push('Veuillez sélectionner un service.');
      if (selectedServiceId === 'autre' && !otherServiceText.trim()) {
        errors.push('Veuillez préciser le service souhaité.');
      }
    } else if (step === 2) {
      if (!propertyType) errors.push('Veuillez sélectionner un type de propriété.');
    } else if (step === 5) {
      if (!timeframe) errors.push('Veuillez préciser votre délai souhaité.');
    } else if (step === 6) {
      if (!firstName.trim()) errors.push('Le prénom est requis.');
      if (!lastName.trim()) errors.push('Le nom de famille est requis.');
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
        errors.push('Veuillez entrer un numéro de téléphone valide à 10 chiffres.');
      }
      if (!email.trim() || !email.includes('@')) {
        errors.push('Veuillez entrer une adresse courriel valide.');
      }
      if (!city.trim()) errors.push('Veuillez entrer votre ville.');
      if (!postalCode.trim() || !isValidQuebecPostalCode(postalCode)) {
        errors.push('Veuillez entrer un code postal canadien valide (ex. H7T 1A1).');
      }
      if (!privacyConsentAccepted) {
        errors.push('Vous devez accepter le traitement de vos renseignements personnels selon la Loi 25.');
      }
    }

    setStepErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setStepErrors([]);
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setStepErrors([]);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);

    const chosenServiceObj = activeServices.find(s => s.id === selectedServiceId);
    const serviceName = selectedServiceId === 'autre'
      ? `Autre : ${otherServiceText}`
      : (chosenServiceObj?.name || 'Service de nettoyage');

    const leadId = generateLeadId();
    const savedPhotoUrls = await uploadLeadPhotos(leadId, uploadedPhotos);

    const lead: LeadSubmission = {
      id: leadId,
      createdAt: new Date().toISOString(),
      siteId: siteConfig.siteId,
      serviceId: selectedServiceId,
      serviceName,
      propertyType,
      specificNeeds: otherNeedText ? [...specificNeeds, `Autre: ${otherNeedText}`] : specificNeeds,
      dimensions: {
        roomsCount,
        approximateSqFt: Number(approximateSqFt) || undefined,
        floorCount,
        itemCount,
        notes: dimensionNotes
      },
      timeframe,
      preferredDate: preferredDate || undefined,
      customer: {
        firstName,
        lastName,
        phone,
        email,
        city,
        postalCode: formatPostalCode(postalCode),
        streetAddress: streetAddress || undefined,
        notes: comments || undefined
      },
      photosCount: uploadedPhotos.length,
      photoNames: uploadedPhotos.map(p => p.name),
      isOutOfTerritory: !territoryCheck.isCovered,
      privacyConsentAccepted,
      marketingConsentAccepted,
      status: 'transmis_supabase'
    };

    await submitLead(lead);

    setIsSubmitting(false);
    setSubmittedLead(lead);
    setIsSuccessModalOpen(true);
    if (onLeadSubmitted) onLeadSubmitted(lead);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      {/* Top Header & Progress */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-blue-950 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Étape {currentStep} sur 6
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              {currentStep === 1 && 'Quel service recherchez-vous ?'}
              {currentStep === 2 && 'Quel est votre type de propriété ?'}
              {currentStep === 3 && 'Quels sont vos besoins précis ?'}
              {currentStep === 4 && 'Dimensions et détails approximatifs'}
              {currentStep === 5 && 'Quand souhaitez-vous cette intervention ?'}
              {currentStep === 6 && 'Vos coordonnées pour la soumission'}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <span className="inline-block text-xs font-bold px-3 py-1 bg-white/10 rounded-full text-blue-200">
              Soumission gratuite & sans engagement
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Errors display */}
      {stepErrors.length > 0 && (
        <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <ul className="list-disc list-inside space-y-1">
            {stepErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {/* STEP 1: SERVICE */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Sélectionnez la catégorie principale correspondant à vos travaux :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviceOptions.map(opt => {
                const IconComponent = opt.icon;
                const isSelected = selectedServiceId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedServiceId(opt.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3.5 group cursor-pointer ${
                      isSelected
                        ? 'border-blue-700 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block text-sm group-hover:text-blue-900">
                        {opt.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedServiceId === 'autre' && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Précisez votre demande particulière :
                </label>
                <input
                  type="text"
                  value={otherServiceText}
                  onChange={(e) => setOtherServiceText(e.target.value)}
                  placeholder="Ex. Nettoyage de luminaires en hauteur, décontamination spécifique..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PROPERTY TYPE */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Dans quel type de bâtiment ou propriété se déroulera le service ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyTypeOptions.map(pt => {
                const isSelected = propertyType === pt;
                return (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => setPropertyType(pt)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-700 bg-blue-50/70 text-blue-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm">{pt}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SPECIFIC NEEDS */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Sélectionnez tous les éléments ou exigences qui s’appliquent à votre situation (choix multiples) :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getDynamicNeeds().map(need => {
                const isChecked = specificNeeds.includes(need);
                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => handleToggleNeed(need)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm leading-snug">{need}</span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Autre besoin ou instruction particulière :
              </label>
              <input
                type="text"
                value={otherNeedText}
                onChange={(e) => setOtherNeedText(e.target.value)}
                placeholder="Ex. Tache d'encre ancienne, présence de chats, accès par la ruelle..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* STEP 4: DIMENSIONS & QUANTITY */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600">
              Donnez-nous une idée de l’ampleur des lieux. Ne vous inquiétez pas si ce sont des chiffres approximatifs !
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nombre de pièces / bureaux
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-slate-900 w-12 text-center">{roomsCount}</span>
                  <button
                    type="button"
                    onClick={() => setRoomsCount(roomsCount + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Superficie approx. (pi²)
                </label>
                <select
                  value={approximateSqFt}
                  onChange={(e) => setApproximateSqFt(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="600">Moins de 800 pi² (Condo / Studio)</option>
                  <option value="1200">800 à 1 500 pi² (Maison moyenne)</option>
                  <option value="2200">1 500 à 2 500 pi² (Grande maison)</option>
                  <option value="3500">2 500 à 4 000 pi²</option>
                  <option value="5000">Plus de 4 000 pi² / Commercial</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nombre d’étages
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFloorCount(Math.max(1, floorCount - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-slate-900 w-12 text-center">{floorCount}</span>
                  <button
                    type="button"
                    onClick={() => setFloorCount(floorCount + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Détails additionnels (ex. tapis spécifiques, dimensions particulières) :
              </label>
              <textarea
                rows={3}
                value={dimensionNotes}
                onChange={(e) => setDimensionNotes(e.target.value)}
                placeholder="Ex. 1 tapis de salon 8x10 en laine, 1 sofa 3 places avec coussins amovibles..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* STEP 5: TIMEFRAME */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <p className="text-sm text-slate-600">
              Quand aimeriez-vous que notre équipe effectue les travaux ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {timeframeOptions.map(tf => {
                const isSelected = timeframe === tf;
                return (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-700 bg-blue-50/70 text-blue-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm">{tf}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Avez-vous une date préférée ? (Optionnel)
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* STEP 6: CONTACT & TERRITORY (LOI 25) */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong>Protection de vos renseignements (Loi 25) :</strong> Vos coordonnées sont strictement réservées à l'établissement de cette soumission et ne seront jamais partagées à des tiers non autorisés.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Prénom <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean-François"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nom de famille <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tremblay"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Téléphone (Québec) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(formatQuebecPhone(e.target.value))}
                  placeholder="(514) 875-1100"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Courriel <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.ca"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ville <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Laval, Montréal, Longueuil..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Code postal <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={7}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  placeholder="H7T 1A1"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />

                {/* Live territory feedback */}
                {postalCode.length >= 3 && (
                  <div className="mt-1.5 text-xs">
                    {territoryCheck.isCovered ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Secteur desservi : {territoryCheck.matchedLocation?.name || 'Grand Montréal & Rives'}
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Secteur en limite de couverture habituelle
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Adresse municipale (Optionnel à cette étape)
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Numéro civique et rue"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Photo upload section */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-slate-500" />
                    Joindre des photos de la pièce ou des taches (Optionnel)
                  </span>
                  <p className="text-xs text-slate-500">Formats acceptés : JPG, PNG, WebP (max 5 Mo par fichier)</p>
                </div>
                <label className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer transition-colors shadow-2xs">
                  Parcourir...
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedPhotos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {uploadedPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs"
                    >
                      <span className="truncate max-w-[140px] font-medium">{photo.name}</span>
                      <span className="text-slate-400 text-[10px]">({photo.size})</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Commentaires ou questions particulières :
              </label>
              <textarea
                rows={2}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Ex. Nous avons un ascenseur, présence d'un animal de compagnie, heure idéale d'appel..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Consents (Loi 25) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={privacyConsentAccepted}
                  onChange={(e) => setPrivacyConsentAccepted(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 shrink-0 mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-slate-700 leading-snug">
                  <strong>Consentement obligatoire (Loi 25) :</strong> J’autorise {siteConfig.branding.siteName} à utiliser mes renseignements pour me transmettre cette soumission personnalisée et me contacter à son sujet.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingConsentAccepted}
                  onChange={(e) => setMarketingConsentAccepted(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 shrink-0 mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-slate-500 leading-snug">
                  (Facultatif) J’aimerais recevoir par courriel des offres saisonnières d’entretien ou des conseils de nettoyage. Vous pouvez vous désabonner à tout moment.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 shadow-md shadow-blue-900/20 transition-colors flex items-center gap-1.5 ml-auto"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Confirmer et recevoir ma soumission
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Confirmation Modal */}
      <LeadSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        lead={submittedLead}
        siteConfig={siteConfig}
      />
    </div>
  );
};
